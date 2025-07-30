import { useState } from 'react';
import { Search, MapPin, Phone, Mail, Star, Filter, Navigation, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/layout/Navbar';

interface Doctor {
  id: string;
  name: string;
  clinic: string;
  specialization: string[];
  rating: number;
  reviews: number;
  distance: number;
  phone: string;
  email: string;
  address: string;
  availability: 'available' | 'busy' | 'unavailable';
  nextSlot: string;
  experience: number;
}

const DoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [maxDistance, setMaxDistance] = useState('10');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      clinic: 'Vision Care Center',
      specialization: ['Retinal Diseases', 'Diabetic Retinopathy'],
      rating: 4.9,
      reviews: 142,
      distance: 2.3,
      phone: '+1 (555) 123-4567',
      email: 'dr.chen@visioncare.com',
      address: '123 Health Street, Medical District',
      availability: 'available',
      nextSlot: 'Today 3:30 PM',
      experience: 12
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      clinic: 'EyeCare Plus',
      specialization: ['Glaucoma', 'Cataract Surgery'],
      rating: 4.8,
      reviews: 89,
      distance: 1.8,
      phone: '+1 (555) 234-5678',
      email: 'dr.rodriguez@eyecareplus.com',
      address: '456 Wellness Ave, Downtown',
      availability: 'busy',
      nextSlot: 'Tomorrow 10:00 AM',
      experience: 15
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      clinic: 'Advanced Eye Institute',
      specialization: ['Corneal Diseases', 'Refractive Surgery'],
      rating: 4.7,
      reviews: 67,
      distance: 4.1,
      phone: '+1 (555) 345-6789',
      email: 'dr.johnson@advancedeye.com',
      address: '789 Medical Plaza, Uptown',
      availability: 'available',
      nextSlot: 'Today 5:15 PM',
      experience: 8
    },
    {
      id: '4',
      name: 'Dr. James Liu',
      clinic: 'Comprehensive Eye Care',
      specialization: ['Pediatric Ophthalmology', 'Strabismus'],
      rating: 4.9,
      reviews: 156,
      distance: 3.7,
      phone: '+1 (555) 456-7890',
      email: 'dr.liu@comprehensiveeye.com',
      address: '321 Family Health Blvd, Suburbia',
      availability: 'available',
      nextSlot: 'Tomorrow 2:00 PM',
      experience: 18
    },
    {
      id: '5',
      name: 'Dr. Maria Gonzalez',
      clinic: 'Retina Specialists',
      specialization: ['Macular Degeneration', 'Retinal Detachment'],
      rating: 4.8,
      reviews: 98,
      distance: 5.2,
      phone: '+1 (555) 567-8901',
      email: 'dr.gonzalez@retinaspecs.com',
      address: '654 Specialist Row, Medical Center',
      availability: 'unavailable',
      nextSlot: 'Next Week',
      experience: 20
    }
  ];

  const specializations = [
    'all',
    'Retinal Diseases',
    'Glaucoma',
    'Cataract Surgery',
    'Corneal Diseases',
    'Pediatric Ophthalmology',
    'Macular Degeneration'
  ];

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialization = selectedSpecialization === 'all' ||
                                 doctor.specialization.includes(selectedSpecialization);
    
    const matchesDistance = doctor.distance <= parseInt(maxDistance);
    
    const matchesAvailability = !showAvailableOnly || doctor.availability === 'available';

    return matchesSearch && matchesSpecialization && matchesDistance && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-success text-white';
      case 'busy': return 'bg-warning text-white';
      case 'unavailable': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'unavailable': return 'Unavailable';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gradient mb-4">Find Eye Care Specialists</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Locate qualified ophthalmologists and eye care professionals near you
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-glass animate-slideInRight sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="text-primary" size={20} />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Doctor name or clinic"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization</label>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec === 'all' ? 'All Specializations' : spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Distance</label>
                  <Select value={maxDistance} onValueChange={setMaxDistance}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="25">Within 25 km</SelectItem>
                      <SelectItem value="50">Within 50 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available-only"
                    checked={showAvailableOnly}
                    onCheckedChange={(checked) => setShowAvailableOnly(checked as boolean)}
                  />
                  <label htmlFor="available-only" className="text-sm font-medium">
                    Available today only
                  </label>
                </div>

                {/* View Mode Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">View</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="w-full"
                    >
                      List
                    </Button>
                    <Button
                      variant={viewMode === 'map' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('map')}
                      className="w-full"
                    >
                      Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              <p className="text-muted-foreground">
                Found {filteredDoctors.length} doctors near you
              </p>
              <Select defaultValue="distance">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="availability">Sort by Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewMode === 'list' ? (
              <div className="space-y-4">
                {filteredDoctors.map((doctor, index) => (
                  <Card key={doctor.id} className="card-glass hover:shadow-medium transition-shadow duration-300 animate-slideInRight" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Doctor Info */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{doctor.name}</h3>
                              <p className="text-muted-foreground">{doctor.clinic}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="text-warning fill-current" size={16} />
                                  <span className="font-medium">{doctor.rating}</span>
                                  <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
                                </div>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground text-sm">{doctor.experience} years exp.</span>
                              </div>
                            </div>
                            <Badge className={getAvailabilityColor(doctor.availability)}>
                              {getAvailabilityText(doctor.availability)}
                            </Badge>
                          </div>

                          {/* Specializations */}
                          <div className="flex flex-wrap gap-2">
                            {doctor.specialization.map((spec) => (
                              <Badge key={spec} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>

                          {/* Contact Info */}
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="text-muted-foreground" size={16} />
                              <span className="text-muted-foreground">{doctor.distance} km away</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="text-muted-foreground" size={16} />
                              <span className="text-muted-foreground">Next: {doctor.nextSlot}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground">{doctor.address}</p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                          <Button className="w-full btn-primary flex items-center space-x-2">
                            <Navigation size={16} />
                            <span>Get Directions</span>
                          </Button>
                          <Button variant="outline" className="w-full flex items-center space-x-2">
                            <Phone size={16} />
                            <span>Call Now</span>
                          </Button>
                          <Button variant="outline" className="w-full flex items-center space-x-2">
                            <Mail size={16} />
                            <span>Email</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-glass h-[600px] animate-slideInRight" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle>Map View</CardTitle>
                  <CardDescription>Interactive map showing doctor locations</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-full bg-secondary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="mx-auto text-muted-foreground" size={48} />
                      <p className="text-lg text-muted-foreground">Interactive Map View</p>
                      <p className="text-sm text-muted-foreground">
                        Map integration would show doctor locations with markers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;