import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, SkipForward } from 'lucide-react'
import { blink } from '../blink/client'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { useToast } from '../hooks/use-toast'

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
  video_url: string
  duration_minutes: number
}

interface CourseProgress {
  id: string
  user_id: string
  course_id: string
  video_position: number
  completed: boolean
}

interface VideoPlayerPageProps {
  courseId: string | null
  user: User
  onNavigate: (page: 'home' | 'course' | 'dashboard' | 'video', courseId?: string) => void
}

export default function VideoPlayerPage({ courseId, user, onNavigate }: VideoPlayerPageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [progress, setProgress] = useState<CourseProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressUpdateRef = useRef<NodeJS.Timeout>()
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

      // Load user progress
      const progressData = await blink.db.courseProgress.list({
        where: { 
          AND: [
            { user_id: user.id },
            { course_id: courseId }
          ]
        }
      })
      
      if (progressData.length > 0) {
        setProgress(progressData[0])
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
  }, [courseId, user.id, toast])

  useEffect(() => {
    loadCourseData()
  }, [loadCourseData])

  // Set video position when progress data loads
  useEffect(() => {
    if (videoRef.current && progress && progress.video_position > 0) {
      videoRef.current.currentTime = progress.video_position
      setCurrentTime(progress.video_position)
    }
  }, [progress])

  // Save progress periodically
  useEffect(() => {
    if (isPlaying && videoRef.current && progress) {
      progressUpdateRef.current = setInterval(async () => {
        const currentPos = videoRef.current?.currentTime || 0
        const videoDuration = videoRef.current?.duration || 0
        
        if (videoDuration > 0) {
          const progressPercentage = (currentPos / videoDuration) * 100
          
          try {
            await blink.db.courseProgress.update(progress.id, {
              video_position: currentPos,
              completed: progressPercentage >= 90
            })

            // Update enrollment progress
            const enrollments = await blink.db.enrollments.list({
              where: { 
                AND: [
                  { user_id: user.id },
                  { course_id: courseId }
                ]
              }
            })
            
            if (enrollments.length > 0) {
              await blink.db.enrollments.update(enrollments[0].id, {
                progress_percentage: progressPercentage
              })
            }
          } catch (error) {
            console.error('Failed to save progress:', error)
          }
        }
      }, 10000) // Save every 10 seconds

      return () => {
        if (progressUpdateRef.current) {
          clearInterval(progressUpdateRef.current)
        }
      }
    }
  }, [isPlaying, progress, user.id, courseId])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleSkipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.currentTime + 10, duration)
      handleSeek(newTime)
    }
  }

  const handleRewind = () => {
    if (videoRef.current) {
      const newTime = Math.max(videoRef.current.currentTime - 10, 0)
      handleSeek(newTime)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="aspect-video bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => onNavigate('course', courseId)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Course
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={course.video_url}
                  className="w-full aspect-video"
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setDuration(videoRef.current.duration)
                    }
                  }}
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime)
                    }
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div 
                      className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const clickX = e.clientX - rect.left
                        const newTime = (clickX / rect.width) * duration
                        handleSeek(newTime)
                      }}
                    >
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRewind}
                        className="text-white hover:bg-white/20"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSkipForward}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleMute}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Course Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <p className="text-muted-foreground">
                Instructor: {course.instructor_name}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {course.description}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Time watched: {formatTime(currentTime)}</p>
                <p>Total duration: {formatTime(duration)}</p>
                <p>Remaining: {formatTime(duration - currentTime)}</p>
              </div>
              
              {progressPercentage >= 90 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm font-medium">
                    🎉 Congratulations! You've completed this course!
                  </p>
                </div>
              )}
              
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                className="w-full"
              >
                View All Courses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}