import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@edustream.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Education St, Learning City, LC 12345',
      description: 'Come say hello at our office'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: '24/7 Online Support',
      description: 'We\'re here to help anytime'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message 
              and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <info.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-indigo-600 font-medium mb-2">
                  {info.details}
                </p>
                <p className="text-gray-600 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="course">Course Information</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map/Image Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Visit Our Office</h3>
                  <p className="text-indigo-100">
                    123 Education Street<br />
                    Learning City, LC 12345
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose EduStream?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Expert instructors from top universities and companies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Interactive learning with hands-on projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>24/7 support and community forums</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Certificates upon course completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Lifetime access to course materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How do I enroll in a course?
                </h3>
                <p className="text-gray-600">
                  Simply browse our course catalog, click on a course you're interested in, 
                  and click the "Enroll Now" button. You'll need to create an account if you haven't already.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Can I access courses on mobile devices?
                </h3>
                <p className="text-gray-600">
                  Yes! Our platform is fully responsive and works great on all devices. 
                  You can learn anywhere, anytime.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you offer certificates?
                </h3>
                <p className="text-gray-600">
                  Yes, you'll receive a certificate of completion for each course you finish. 
                  These can be shared on LinkedIn and other professional networks.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What if I'm not satisfied with a course?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee on all paid courses. 
                  If you're not satisfied, contact our support team for a full refund.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How long do I have access to a course?
                </h3>
                <p className="text-gray-600">
                  Once you enroll in a course, you have lifetime access to all course materials, 
                  including any future updates.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Can I become an instructor?
                </h3>
                <p className="text-gray-600">
                  Absolutely! We're always looking for expert instructors. 
                  Contact us to learn about our instructor application process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;