import { useState } from 'react';
import { User, Mail, Phone, Calendar, Edit3, Save, X, Camera, Bell, Shield, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    joinDate: '2024-01-15'
  });

  const [notifications, setNotifications] = useState({
    scanReminders: true,
    healthTips: true,
    appointmentAlerts: true,
    newsletter: false
  });

  const scanHistory = [
    { date: '2024-01-20', result: 'Healthy', confidence: 98 },
    { date: '2024-01-15', result: 'Mild Dry Eyes', confidence: 85 },
    { date: '2024-01-10', result: 'Healthy', confidence: 96 }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gradient mb-4">Your Profile</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your account settings and view your eye health history
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="card-glass animate-slideInRight">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="text-primary" size={24} />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit3 size={16} className="mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={handleSave} size="sm" className="btn-primary">
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                        <Camera size={14} />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <Input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-muted' : ''}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-muted' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="card-glass animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="text-primary" size={24} />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {key === 'scanReminders' && 'Scan Reminders'}
                        {key === 'healthTips' && 'Eye Health Tips'}
                        {key === 'appointmentAlerts' && 'Appointment Alerts'}
                        {key === 'newsletter' && 'Newsletter'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {key === 'scanReminders' && 'Get reminded to perform regular eye scans'}
                        {key === 'healthTips' && 'Receive weekly eye health tips and advice'}
                        {key === 'appointmentAlerts' && 'Get notified about upcoming appointments'}
                        {key === 'newsletter' && 'Monthly newsletter with health updates'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, [key]: checked})
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scan History */}
            <Card className="card-glass animate-slideInRight" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="text-primary" size={24} />
                  <span>Recent Scan History</span>
                </CardTitle>
                <CardDescription>Your latest eye health scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanHistory.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{new Date(scan.date).toLocaleDateString()}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={scan.result === 'Healthy' ? 'secondary' : 'outline'}>
                            {scan.result}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {scan.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <Progress value={scan.confidence} className="w-24 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-glass animate-slideInRight" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Your Health Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3</div>
                  <p className="text-sm text-muted-foreground">Total Scans</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">93%</div>
                  <p className="text-sm text-muted-foreground">Avg. Health Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">5</div>
                  <p className="text-sm text-muted-foreground">Days Since Last Scan</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-glass animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-primary">
                  <Scan size={16} className="mr-2" />
                  New Eye Scan
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar size={16} className="mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  <Shield size={16} className="mr-2" />
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;