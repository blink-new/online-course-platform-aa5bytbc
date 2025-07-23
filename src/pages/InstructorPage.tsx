import React, { useState, useEffect, useCallback } from 'react';
import { blink } from '../blink/client';
import { Plus, Edit, Trash2, Users, DollarSign, Clock, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_name: string;
  instructor_id: string;
  price: number;
  duration_minutes: number;
  level: string;
  category: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
}

interface Enrollment {
  id: string;
  course_id: string;
  user_id: string;
  enrolled_at: string;
}

const InstructorPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    duration_minutes: '',
    level: 'beginner',
    category: 'Programming',
    thumbnail_url: '',
    video_url: ''
  });

  const loadData = useCallback(async () => {
    try {
      const userData = await blink.auth.me();
      setUser(userData);

      // Load instructor's courses
      const coursesData = await blink.db.courses.list({
        where: { instructor_id: userData.id }
      });
      setCourses(coursesData);

      // Load enrollments for instructor's courses
      const courseIds = coursesData.map(course => course.id);
      if (courseIds.length > 0) {
        const enrollmentsData = await blink.db.enrollments.list({
          where: { 
            course_id: { in: courseIds }
          }
        });
        setEnrollments(enrollmentsData);
      }
    } catch (error) {
      console.error('Error loading instructor data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const courseData = {
        id: `course_${Date.now()}`,
        title: newCourse.title,
        description: newCourse.description,
        instructor_name: user.displayName || user.email,
        instructor_id: user.id,
        price: parseFloat(newCourse.price),
        duration_minutes: parseInt(newCourse.duration_minutes),
        level: newCourse.level,
        category: newCourse.category,
        thumbnail_url: newCourse.thumbnail_url || 'https://images.unsplash.com/photo-1584949092454-fb69707150f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMHRlY2hub2xvZ3l8ZW58MHwwfHx8MTc1MzI5NDQ0OXww&ixlib=rb-4.1.0&q=80&w=1080',
        video_url: newCourse.video_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      };

      await blink.db.courses.create(courseData);
      
      // Reset form and reload data
      setNewCourse({
        title: '',
        description: '',
        price: '',
        duration_minutes: '',
        level: 'beginner',
        category: 'Programming',
        thumbnail_url: '',
        video_url: ''
      });
      setShowCreateForm(false);
      loadData();
      
      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await blink.db.courses.delete(courseId);
      loadData();
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course. Please try again.');
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const totalRevenue = courses.reduce((sum, course) => {
    const courseEnrollments = enrollments.filter(e => e.course_id === course.id);
    return sum + (course.price * courseEnrollments.length);
  }, 0);

  const totalStudents = enrollments.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Instructor Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.displayName || user?.email}!
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Courses</h2>
          </div>
          
          {courses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-4">Create your first course to start teaching!</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Create Your First Course
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {courses.map((course) => {
                const courseEnrollments = enrollments.filter(e => e.course_id === course.id);
                return (
                  <div key={course.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {course.description.substring(0, 100)}...
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{courseEnrollments.length} students</span>
                            <span>${course.price}</span>
                            <span>{formatDuration(course.duration_minutes)}</span>
                            <span className="capitalize">{course.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Course</h2>
            </div>
            
            <form onSubmit={handleCreateCourse} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Describe your course"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newCourse.duration_minutes}
                    onChange={(e) => setNewCourse({ ...newCourse, duration_minutes: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL (optional)
                </label>
                <input
                  type="url"
                  value={newCourse.thumbnail_url}
                  onChange={(e) => setNewCourse({ ...newCourse, thumbnail_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL (optional)
                </label>
                <input
                  type="url"
                  value={newCourse.video_url}
                  onChange={(e) => setNewCourse({ ...newCourse, video_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com/video.mp4"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorPage;