import React, { useState, useEffect } from 'react';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import { blink } from '../blink/client';

interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  rating: number;
  students: number;
  courses: number;
  specialties: string[];
}

const InstructorsPage: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock instructor data with real images
    const mockInstructors: Instructor[] = [
      {
        id: 'instructor_1',
        name: 'Sarah Johnson',
        title: 'Senior Software Engineer',
        bio: 'Former Google engineer with 10+ years of experience in full-stack development. Passionate about teaching modern web technologies.',
        image: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
        rating: 4.9,
        students: 12500,
        courses: 8,
        specialties: ['React', 'JavaScript', 'Node.js', 'TypeScript']
      },
      {
        id: 'instructor_2',
        name: 'Dr. Michael Chen',
        title: 'AI Research Scientist',
        bio: 'PhD in Computer Science from MIT. Leading researcher in machine learning and artificial intelligence with 50+ published papers.',
        image: 'https://images.unsplash.com/photo-1654375408506-382720d3e05f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMHRlY2hub2xvZ3l8ZW58MHwwfHx8MTc1MzI5NDQ0OXww&ixlib=rb-4.1.0&q=80&w=400',
        rating: 4.8,
        students: 8900,
        courses: 5,
        specialties: ['Machine Learning', 'Python', 'Data Science', 'AI']
      },
      {
        id: 'instructor_3',
        name: 'Emma Rodriguez',
        title: 'UX Design Director',
        bio: 'Award-winning designer with experience at Apple and Airbnb. Specializes in user-centered design and design systems.',
        image: 'https://images.unsplash.com/photo-1629360067822-89c74b25bb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
        rating: 4.9,
        students: 15200,
        courses: 12,
        specialties: ['UI/UX Design', 'Figma', 'Design Systems', 'Prototyping']
      },
      {
        id: 'instructor_4',
        name: 'James Park',
        title: 'Mobile Development Expert',
        bio: 'Senior mobile developer with expertise in React Native and Flutter. Built apps used by millions of users worldwide.',
        image: 'https://images.unsplash.com/photo-1629360035258-2ccb13aa3679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
        rating: 4.7,
        students: 9800,
        courses: 6,
        specialties: ['React Native', 'Flutter', 'Mobile UI', 'App Store']
      },
      {
        id: 'instructor_5',
        name: 'Dr. Lisa Wang',
        title: 'Data Science Professor',
        bio: 'Professor at Stanford University with expertise in statistical analysis and machine learning. Published author of data science textbooks.',
        image: 'https://images.unsplash.com/photo-1630705605873-5d7776c38d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
        rating: 4.9,
        students: 11300,
        courses: 9,
        specialties: ['Data Science', 'Statistics', 'Python', 'R']
      },
      {
        id: 'instructor_6',
        name: 'Alex Thompson',
        title: 'Professional Photographer',
        bio: 'Award-winning photographer featured in National Geographic. Specializes in landscape and portrait photography.',
        image: 'https://images.unsplash.com/photo-1629359652978-a5d383151c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
        rating: 4.8,
        students: 7600,
        courses: 4,
        specialties: ['Photography', 'Lightroom', 'Photoshop', 'Composition']
      }
    ];

    setInstructors(mockInstructors);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our Instructors
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Learn from industry experts and world-class educators who are passionate 
              about sharing their knowledge and helping you succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div 
                key={instructor.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img 
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{instructor.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-3">
                    {instructor.title}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {instructor.bio}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{instructor.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{instructor.courses} courses</span>
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.slice(0, 3).map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {instructor.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{instructor.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    View Courses
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Become an Instructor CTA */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become an Instructor
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your expertise with thousands of students worldwide. 
            Join our community of educators and make a lasting impact.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Apply to Teach
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;