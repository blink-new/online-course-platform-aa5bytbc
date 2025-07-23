import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { HelpCircle, Search, MessageCircle, Mail, Phone, Clock } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, simply browse our course catalog, click on the course you\'re interested in, and click the "Enroll Now" button. If it\'s a paid course, you\'ll be directed to the payment page. Once payment is complete, you\'ll have immediate access to all course materials.',
      category: 'Getting Started'
    },
    {
      id: '2',
      question: 'Can I access courses on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. You can continue your learning anywhere, anytime.',
      category: 'Technical'
    },
    {
      id: '3',
      question: 'How do I track my learning progress?',
      answer: 'Your learning progress is automatically tracked as you complete lessons and assignments. You can view your progress on your dashboard, which shows completion percentages, time spent learning, and upcoming deadlines.',
      category: 'Learning'
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.',
      category: 'Billing'
    },
    {
      id: '5',
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with a course within 30 days of purchase, contact our support team for a full refund.',
      category: 'Billing'
    },
    {
      id: '6',
      question: 'How do I download my certificate?',
      answer: 'Once you complete a course with a passing grade, your certificate will be automatically generated and available in your "Certificates" section. You can download it as a PDF file.',
      category: 'Certificates'
    },
    {
      id: '7',
      question: 'Can I interact with instructors?',
      answer: 'Yes! Many of our courses include discussion forums, live Q&A sessions, and direct messaging with instructors. Check the course details to see what interaction options are available.',
      category: 'Learning'
    },
    {
      id: '8',
      question: 'How long do I have access to a course?',
      answer: 'Once you enroll in a course, you have lifetime access to all course materials. You can learn at your own pace and revisit content whenever you need to.',
      category: 'Getting Started'
    },
    {
      id: '9',
      question: 'What if I forget my password?',
      answer: 'If you forget your password, click the "Forgot Password" link on the login page. We\'ll send you a password reset link to your registered email address.',
      category: 'Technical'
    },
    {
      id: '10',
      question: 'Are there any prerequisites for courses?',
      answer: 'Prerequisites vary by course and are clearly listed on each course page. Some beginner courses have no prerequisites, while advanced courses may require prior knowledge or completion of other courses.',
      category: 'Learning'
    }
  ]

  const categories = ['All', 'Getting Started', 'Learning', 'Technical', 'Billing', 'Certificates']

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Find answers to common questions and get the support you need
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Get instant help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Mail className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Send us a detailed message</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Phone className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Call us for urgent issues</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Call Now</Button>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse different categories</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg border">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-start justify-between w-full">
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                        {faq.category}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Still need help?</h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Input placeholder="Brief description of your issue" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <Textarea 
                placeholder="Please describe your issue in detail..."
                rows={6}
              />
            </div>
            
            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </form>
        </div>

        {/* Support Hours */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Support Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Live Chat & Phone:</strong><br />
              Monday - Friday: 9:00 AM - 6:00 PM EST<br />
              Saturday: 10:00 AM - 4:00 PM EST
            </div>
            <div>
              <strong>Email Support:</strong><br />
              24/7 - We respond within 24 hours<br />
              Priority support for premium users
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}