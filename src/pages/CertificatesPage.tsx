import React, { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Award, Download, Calendar, User } from 'lucide-react'

interface Certificate {
  id: string
  course_title: string
  completion_date: string
  instructor_name: string
  certificate_url: string
  grade?: string
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const loadCertificates = async (userId: string) => {
    try {
      // For demo purposes, create some sample certificates
      const sampleCertificates: Certificate[] = [
        {
          id: '1',
          course_title: 'Complete React Development Course',
          completion_date: '2024-01-15',
          instructor_name: 'Sarah Johnson',
          certificate_url: '#',
          grade: 'A+'
        },
        {
          id: '2',
          course_title: 'Advanced JavaScript Concepts',
          completion_date: '2024-01-10',
          instructor_name: 'Mike Chen',
          certificate_url: '#',
          grade: 'A'
        },
        {
          id: '3',
          course_title: 'UI/UX Design Fundamentals',
          completion_date: '2023-12-20',
          instructor_name: 'Emily Davis',
          certificate_url: '#',
          grade: 'A-'
        }
      ]
      setCertificates(sampleCertificates)
    } catch (error) {
      console.error('Error loading certificates:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      if (state.user) {
        loadCertificates(state.user.id)
      }
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])



  const downloadCertificate = (certificate: Certificate) => {
    // In a real app, this would download the actual certificate
    alert(`Downloading certificate for: ${certificate.course_title}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificates...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view certificates</h2>
          <p className="text-gray-600">Please sign in to access your earned certificates.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Your Certificates</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Showcase your achievements and download your earned certificates
            </p>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-600 mb-6">Complete courses to earn your first certificate!</p>
            <Button onClick={() => window.location.href = '/'}>
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Congratulations on your achievements!
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                You've earned {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}. 
                Keep learning to unlock more achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((certificate) => (
                <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1617149897850-9b0dea0a2705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGFjaGlldmVtZW50JTIwZ3JhZHVhdGlvbnxlbnwwfDB8fHwxNzUzMjk1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Certificate"
                        className="w-full h-full object-cover opacity-20"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Award className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{certificate.course_title}</CardTitle>
                    <CardDescription>Certificate of Completion</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {certificate.instructor_name}
                      </div>
                      {certificate.grade && (
                        <Badge variant="secondary">{certificate.grade}</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Completed on {new Date(certificate.completion_date).toLocaleDateString()}
                    </div>

                    <Button 
                      onClick={() => downloadCertificate(certificate)}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Achievement Stats */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
            <p className="text-gray-600">Track your progress and celebrate your achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{certificates.length}</div>
              <div className="text-gray-600">Certificates Earned</div>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {certificates.length > 0 ? Math.ceil((Date.now() - new Date(certificates[certificates.length - 1].completion_date).getTime()) / (1000 * 60 * 60 * 24)) : 0}
              </div>
              <div className="text-gray-600">Days Since Last</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {new Set(certificates.map(c => c.instructor_name)).size}
              </div>
              <div className="text-gray-600">Instructors</div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{certificates.length}</div>
              <div className="text-gray-600">Downloads Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}