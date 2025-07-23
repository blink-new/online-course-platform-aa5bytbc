import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Online Learning: Trends to Watch in 2024',
      excerpt: 'Discover the latest trends shaping the future of online education, from AI-powered personalization to immersive virtual reality experiences.',
      content: 'Full article content...',
      author: 'Sarah Johnson',
      date: '2024-01-20',
      category: 'Education Technology',
      image: 'https://images.unsplash.com/photo-1603201667230-bd139210db18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDB8MHx8fDE3NTMyOTQ5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'How to Stay Motivated While Learning Online',
      excerpt: 'Practical tips and strategies to maintain motivation and achieve your learning goals in an online environment.',
      content: 'Full article content...',
      author: 'Mike Chen',
      date: '2024-01-18',
      category: 'Learning Tips',
      image: 'https://images.unsplash.com/photo-1603201667106-0e3e0ae584c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDB8MHx8fDE3NTMyOTQ5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '4 min read'
    },
    {
      id: '3',
      title: 'Building a Successful Career in Tech: A Complete Guide',
      excerpt: 'From choosing the right programming language to landing your first job, here\'s everything you need to know about starting a tech career.',
      content: 'Full article content...',
      author: 'Emily Davis',
      date: '2024-01-15',
      category: 'Career Development',
      image: 'https://images.unsplash.com/photo-1676275773828-19040454afab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDB8MHx8fDE3NTMyOTQ5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '8 min read'
    },
    {
      id: '4',
      title: 'The Benefits of Microlearning: Small Steps, Big Results',
      excerpt: 'Learn how breaking down complex topics into bite-sized lessons can improve retention and make learning more enjoyable.',
      content: 'Full article content...',
      author: 'David Wilson',
      date: '2024-01-12',
      category: 'Learning Science',
      image: 'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDB8MHx8fDE3NTMyOTQ5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '6 min read'
    },
    {
      id: '5',
      title: 'Remote Work Skills Every Professional Needs',
      excerpt: 'Master the essential skills for remote work success, from communication and time management to digital collaboration tools.',
      content: 'Full article content...',
      author: 'Lisa Thompson',
      date: '2024-01-10',
      category: 'Professional Skills',
      image: 'https://images.unsplash.com/photo-1603357465999-241beecc2629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDB8MHx8fDE3NTMyOTQ5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '7 min read'
    }
  ]

  const categories = ['All', 'Education Technology', 'Learning Tips', 'Career Development', 'Learning Science', 'Professional Skills']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPost = blogPosts[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">EduStream Blog</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Insights, tips, and stories from the world of online learning
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4">{featuredPost.category}</Badge>
                <CardTitle className="text-2xl mb-4">{featuredPost.title}</CardTitle>
                <CardDescription className="text-lg mb-6">{featuredPost.excerpt}</CardDescription>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {featuredPost.readTime}
                  </div>
                </div>

                <Button>
                  Read Full Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest articles, learning tips, and industry insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}