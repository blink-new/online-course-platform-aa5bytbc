import React from 'react';
import { Users, Award, BookOpen, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Active Students', value: '50,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '500+' },
    { icon: Award, label: 'Expert Instructors', value: '200+' },
    { icon: Globe, label: 'Countries Reached', value: '120+' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
      bio: 'Former tech executive with 15+ years in education technology.'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Head of Curriculum',
      image: 'https://images.unsplash.com/photo-1629360067822-89c74b25bb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
      bio: 'PhD in Computer Science, passionate about making learning accessible.'
    },
    {
      name: 'Emma Thompson',
      role: 'VP of Student Success',
      image: 'https://images.unsplash.com/photo-1629360035258-2ccb13aa3679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
      bio: 'Dedicated to ensuring every student achieves their learning goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About EduStream
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Empowering learners worldwide with high-quality, accessible education 
              that transforms careers and lives.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that quality education should be accessible to everyone, 
                regardless of their location, background, or circumstances. Our platform 
                connects passionate instructors with eager learners, creating a global 
                community of knowledge sharing.
              </p>
              <p className="text-lg text-gray-600">
                Through cutting-edge technology and innovative teaching methods, we're 
                breaking down barriers to education and helping millions of people 
                achieve their personal and professional goals.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1629359652978-a5d383151c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDB8MHx8fDE3NTMyOTQ0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students learning together"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to educational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate educators and technologists working to transform online learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-gray-300">
                We maintain the highest standards in course content and learning experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-300">
                Learning is better together. We foster connections between students and instructors.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-300">
                Education should be available to everyone, everywhere, at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;