import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Play, Clock, Users, Star, CreditCard } from 'lucide-react'
import { blink } from '../blink/client'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useToast } from '../hooks/use-toast'

interface Course {
  id: string
  title: string
  description: string
  instructor_name: string
  price: number
  thumbnail_url: string
  video_url: string
  duration_minutes: number
  level: string
  category: string
}

interface Enrollment {
  id: string
  user_id: string
  course_id: string
  progress_percentage: number
  payment_status: string
}

interface CoursePageProps {
  courseId: string | null
  onNavigate: (page: 'home' | 'course' | 'dashboard' | 'video', courseId?: string) => void
}

export default function CoursePage({ courseId, onNavigate }: CoursePageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const { toast } = useToast()

  const loadCourseData = useCallback(async () => {
    if (!courseId) return
    
    try {
      // Load course details
      const courses = await blink.db.courses.list({
        where: { id: courseId }
      })
      
      if (courses.length > 0) {
        setCourse(courses[0])
      }

      // Check if user is already enrolled
      const user = await blink.auth.me()
      const enrollments = await blink.db.enrollments.list({
        where: { 
          AND: [
            { user_id: user.id },
            { course_id: courseId }
          ]
        }
      })
      
      if (enrollments.length > 0) {
        setEnrollment(enrollments[0])
      }
    } catch (error) {
      console.error('Failed to load course data:', error)
      toast({
        title: "Error",
        description: "Failed to load course information",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [courseId, toast])

  useEffect(() => {
    loadCourseData()
  }, [loadCourseData])

  const handleEnroll = async () => {
    if (!course) return
    
    setEnrolling(true)
    try {
      const user = await blink.auth.me()
      
      // Create enrollment record
      const enrollmentId = `enrollment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      await blink.db.enrollments.create({
        id: enrollmentId,
        user_id: user.id,
        course_id: course.id,
        progress_percentage: 0,
        payment_status: course.price > 0 ? 'pending' : 'completed'
      })

      // Create progress tracking record
      const progressId = `progress_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      await blink.db.courseProgress.create({
        id: progressId,
        user_id: user.id,
        course_id: course.id,
        video_position: 0,
        completed: false
      })

      toast({
        title: "Success!",
        description: course.price > 0 ? "Enrollment pending payment" : "Successfully enrolled in course"
      })

      // Reload enrollment data
      await loadCourseData()
    } catch (error) {
      console.error('Failed to enroll:', error)
      toast({
        title: "Error",
        description: "Failed to enroll in course",
        variant: "destructive"
      })
    } finally {
      setEnrolling(false)
    }
  }

  const handleStartLearning = () => {
    if (course) {
      onNavigate('video', course.id)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Course not found.</p>
        </div>
      </div>
    )
  }

  const isEnrolled = enrollment !== null
  const canStartLearning = isEnrolled && (course.price === 0 || enrollment?.payment_status === 'completed')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => onNavigate('home')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Button>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden mb-6">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                size="lg"
                onClick={canStartLearning ? handleStartLearning : undefined}
                disabled={!canStartLearning}
                className="bg-white text-black hover:bg-white/90"
              >
                <Play className="h-5 w-5 mr-2" />
                {canStartLearning ? 'Start Learning' : 'Preview'}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Badge className={getLevelColor(course.level)}>
              {course.level}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {course.category}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            {course.title}
          </h1>

          <p className="text-muted-foreground text-lg mb-6">
            {course.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course.instructor_name}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(course.duration_minutes)}
            </span>
            <span className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              4.8 (124 reviews)
            </span>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-3xl font-bold text-primary">
                  ${course.price}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Progress: {Math.round(enrollment.progress_percentage)}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {canStartLearning ? (
                    <Button
                      onClick={handleStartLearning}
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Payment Status: {enrollment.payment_status}
                      </p>
                      <Button
                        className="w-full bg-accent hover:bg-accent/90"
                        size="lg"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Complete Payment
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {enrolling ? (
                    "Enrolling..."
                  ) : course.price > 0 ? (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Enroll Now
                    </>
                  ) : (
                    "Enroll for Free"
                  )}
                </Button>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p>30-day money-back guarantee</p>
                <p>Lifetime access</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Card>
        <CardHeader>
          <CardTitle>What you'll learn</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              Master the fundamentals and advanced concepts
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              Build real-world projects from scratch
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              Learn industry best practices and patterns
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              Get hands-on experience with practical exercises
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}