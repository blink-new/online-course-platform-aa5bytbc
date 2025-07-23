import { useState, useEffect } from 'react'
import { Search, Star, Clock, Users, Play } from 'lucide-react'
import { blink } from '../blink/client'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card'
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
  price: number
  thumbnail_url: string
  duration_minutes: number
  level: string
  category: string
}

interface HomePageProps {
  user: User
  onNavigate: (page: 'home' | 'course' | 'dashboard' | 'video', courseId?: string) => void
}

export default function HomePage({ user, onNavigate }: HomePageProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const loadCourses = async () => {
    try {
      const coursesData = await blink.db.courses.list({
        orderBy: { created_at: 'desc' }
      })
      setCourses(coursesData)
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))]

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Welcome back, {user.displayName || 'Student'}!
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Continue your learning journey with our comprehensive course library
        </p>
        <Button 
          onClick={() => onNavigate('dashboard')}
          size="lg" 
          className="bg-primary hover:bg-primary/90"
        >
          View My Progress
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card key={course.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="sm"
                  onClick={() => onNavigate('course', course.id)}
                  className="bg-white text-black hover:bg-white/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  View Course
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
              <p className="text-muted-foreground text-sm line-clamp-2">
                {course.description}
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.instructor_name}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDuration(course.duration_minutes)}
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                ${course.price}
              </span>
              <Button
                onClick={() => onNavigate('course', course.id)}
                className="bg-primary hover:bg-primary/90"
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No courses found matching your criteria.
          </p>
        </div>
      )}
    </div>
  )
}