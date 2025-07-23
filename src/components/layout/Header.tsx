import { GraduationCap, User, LogOut, Home, BookOpen, BarChart3, Users, Mail, Info } from 'lucide-react'
import { blink } from '../../blink/client'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface User {
  id: string
  email: string
  displayName?: string
}

interface HeaderProps {
  user: User
  currentPage: string
  onNavigate: (page: 'home' | 'course' | 'dashboard' | 'video' | 'about' | 'instructors' | 'contact') => void
}

export default function Header({ user, currentPage, onNavigate }: HeaderProps) {
  const handleLogout = () => {
    blink.auth.logout()
  }

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">EduStream</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </button>
            <button
              onClick={() => onNavigate('instructors')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'instructors'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Instructors</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'dashboard'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.displayName || 'Student'}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}