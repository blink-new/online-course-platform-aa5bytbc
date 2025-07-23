import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Toaster } from './components/ui/toaster'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import DashboardPage from './pages/DashboardPage'
import VideoPlayerPage from './pages/VideoPlayerPage'

type Page = 'home' | 'course' | 'dashboard' | 'video'

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const navigateTo = (page: Page, courseId?: string) => {
    setCurrentPage(page)
    if (courseId) {
      setSelectedCourseId(courseId)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading EduStream...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">EduStream</h1>
            <p className="text-muted-foreground">Your gateway to online learning</p>
          </div>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'course':
        return <CoursePage courseId={selectedCourseId} onNavigate={navigateTo} />
      case 'dashboard':
        return <DashboardPage user={user} onNavigate={navigateTo} />
      case 'video':
        return <VideoPlayerPage courseId={selectedCourseId} user={user} onNavigate={navigateTo} />
      default:
        return <HomePage user={user} onNavigate={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} currentPage={currentPage} onNavigate={navigateTo} />
      <main>
        {renderCurrentPage()}
      </main>
      <Toaster />
    </div>
  )
}

export default App