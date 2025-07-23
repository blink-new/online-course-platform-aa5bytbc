import { useState, useEffect, useCallback } from 'react'
import { Play, Clock, BookOpen, TrendingUp, Award } from 'lucide-react'
import { blink } from '../blink/client'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'

interface User {
  id: string
  email: string
  displayName?: string
}

interface Course {
  id: string
  title: string
  description: string
  instructor_name: string
  thumbnail_url: string
  duration_minutes: number
  level: string
  category: string
}

interface Enrollment {
  id: string
  user_id: string
  course_id: string
  progress_percentage: number
  enrolled_at: string
  payment_status: string
}

interface EnrolledCourse extends Course {
  enrollment: Enrollment
}

interface DashboardPageProps {
  user: User
  onNavigate: (page: 'home' | 'course' | 'dashboard' | 'video', courseId?: string) => void
}

export default function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0
  })

  const loadDashboardData = useCallback(async () => {
    try {
      // Load user enrollments
      const enrollments = await blink.db.enrollments.list({
        where: { user_id: user.id },
        orderBy: { enrolled_at: 'desc' }
      })

      // Load course details for enrolled courses
      const coursePromises = enrollments.map(async (enrollment) => {
        const courses = await blink.db.courses.list({
          where: { id: enrollment.course_id }
        })
        if (courses.length > 0) {
          return {
            ...courses[0],
            enrollment
          }
        }
        return null
      })

      const coursesWithEnrollment = await Promise.all(coursePromises)
      const validCourses = coursesWithEnrollment.filter(course => course !== null) as EnrolledCourse[]
      
      setEnrolledCourses(validCourses)

      // Calculate stats
      const totalCourses = validCourses.length
      const completedCourses = validCourses.filter(course => 
        Number(course.enrollment.progress_percentage) >= 90
      ).length
      const totalHours = validCourses.reduce((sum, course) => 
        sum + course.duration_minutes, 0
      ) / 60
      const averageProgress = totalCourses > 0 
        ? validCourses.reduce((sum, course) => 
            sum + Number(course.enrollment.progress_percentage), 0
          ) / totalCourses
        : 0

      setStats({
        totalCourses,
        completedCourses,
        totalHours: Math.round(totalHours * 10) / 10,
        averageProgress: Math.round(averageProgress)
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

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

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600'
    if (progress >= 50) return 'text-yellow-600'
    return 'text-blue-600'
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user.displayName || 'Student'}!
        </h1>
        <p className="text-muted-foreground">
          Track your learning progress and continue your courses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Enrolled Courses
                </p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Hours
                </p>
                <p className="text-2xl font-bold">{stats.totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Progress
                </p>
                <p className="text-2xl font-bold">{stats.averageProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
          <Button onClick={() => onNavigate('home')}>
            Browse More Courses
          </Button>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Button onClick={() => onNavigate('home')}>
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => {
              const progress = Number(course.enrollment.progress_percentage)
              const isCompleted = progress >= 90
              
              return (
                <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-lg">
                      <Button
                        onClick={() => onNavigate('video', course.id)}
                        className="bg-white text-black hover:bg-white/90"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor_name}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span className={getProgressColor(progress)}>
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(course.duration_minutes)}
                        </span>
                        <span className="capitalize">{course.category}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => onNavigate('video', course.id)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                          size="sm"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {progress > 0 ? 'Continue' : 'Start'}
                        </Button>
                        <Button
                          onClick={() => onNavigate('course', course.id)}
                          variant="outline"
                          size="sm"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {enrolledCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledCourses.slice(0, 5).map(course => (
                <div key={course.id} className="flex items-center space-x-4">
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Enrolled {new Date(course.enrollment.enrolled_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {Math.round(Number(course.enrollment.progress_percentage))}% complete
                    </p>
                    <Button
                      onClick={() => onNavigate('video', course.id)}
                      variant="ghost"
                      size="sm"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}