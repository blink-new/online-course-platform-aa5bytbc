import React, { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Switch } from '../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Settings, User, Bell, Shield, CreditCard, Download, Upload } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Profile settings
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [courseUpdates, setCourseUpdates] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  
  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [showProgress, setShowProgress] = useState(true)
  const [showCertificates, setShowCertificates] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      if (state.user) {
        // Load user settings
        setDisplayName(state.user.displayName || '')
        // In a real app, you'd load these from the database
        setBio('Passionate learner exploring new technologies and skills.')
        setWebsite('https://example.com')
        setLocation('San Francisco, CA')
      }
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleSaveProfile = async () => {
    if (!user) return
    
    setSaving(true)
    try {
      await blink.auth.updateMe({ displayName })
      // In a real app, you'd also save bio, website, location to database
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNotifications = () => {
    // In a real app, save notification preferences to database
    alert('Notification preferences saved!')
  }

  const handleSavePrivacy = () => {
    // In a real app, save privacy settings to database
    alert('Privacy settings saved!')
  }

  const handleExportData = () => {
    // In a real app, generate and download user data
    alert('Data export will be sent to your email within 24 hours.')
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, handle account deletion
      alert('Account deletion request submitted. You will receive a confirmation email.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to access settings</h2>
          <p className="text-gray-600">Please sign in to manage your account settings.</p>
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
            <Settings className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Account Settings</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Manage your profile, preferences, and account security
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback className="text-2xl">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      value={user.email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <Input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates and activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Course Updates</h4>
                      <p className="text-sm text-gray-500">Get notified about new lessons and announcements</p>
                    </div>
                    <Switch
                      checked={courseUpdates}
                      onCheckedChange={setCourseUpdates}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-gray-500">Receive promotional content and special offers</p>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications}>
                  Save Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control who can see your profile and learning activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Public Profile</h4>
                      <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      checked={profileVisibility}
                      onCheckedChange={setProfileVisibility}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Learning Progress</h4>
                      <p className="text-sm text-gray-500">Display your course progress on your profile</p>
                    </div>
                    <Switch
                      checked={showProgress}
                      onCheckedChange={setShowProgress}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Certificates</h4>
                      <p className="text-sm text-gray-500">Display your earned certificates publicly</p>
                    </div>
                    <Switch
                      checked={showCertificates}
                      onCheckedChange={setShowCertificates}
                    />
                  </div>
                </div>

                <Button onClick={handleSavePrivacy}>
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Account Type</h4>
                      <p className="text-sm text-gray-500">Free Plan</p>
                    </div>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Member Since</h4>
                      <p className="text-sm text-gray-500">January 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Courses Completed</h4>
                      <p className="text-sm text-gray-500">3 courses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Export */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <CardDescription>
                    Download a copy of your personal data and learning history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    This will permanently delete your account and all associated data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}