import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Car,
  Fuel,
  Users,
  Settings,
  Shield,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Input from '../../components/ui/Input';

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = () => {
    setLoading(true);
    setTimeout(() => {
      const mockCar = {
        id: parseInt(id),
        name: 'Tesla Model 3',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        price: 120,
        rating: 4.9,
        reviewCount: 156,
        images: [
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
          'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
          'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800',
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
        ],
        location: 'Los Angeles, CA',
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Electric',
        mileage: 12500,
        description: 'Experience the future of driving with this stunning Tesla Model 3. Features include autopilot, premium interior, and incredible acceleration. Perfect for business trips or family vacations.',
        features: [
          'Autopilot',
          'Premium Sound System',
          'Heated Seats',
          'Glass Roof',
          'Navigation',
          'Bluetooth',
          'Backup Camera',
          'Keyless Entry'
        ],
        owner: {
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          rating: 4.8,
          memberSince: '2022',
          totalCars: 3,
          responseRate: 98,
          responseTime: '2 hours'
        },
        reviews: [
          { name: 'John Smith', rating: 5, date: '2024-01-15', comment: 'Amazing car! Very clean and great communication with owner.' },
          { name: 'Mike Brown', rating: 5, date: '2024-01-10', comment: 'Smooth ride, perfect condition. Will rent again!' }
        ]
      };
      setCar(mockCar);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (pickupDate && dropoffDate && car) {
      const days = Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * car.price);
    }
  }, [pickupDate, dropoffDate, car]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-[#F9F8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-96">
            <img 
              src={car.images[currentImage]} 
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : car.images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentImage((prev) => (prev < car.images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {car.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${idx === currentImage ? 'border-[#D97706]' : 'border-transparent'}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Title & Rating */}
            <Card>
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">{car.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-[#52525B]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{car.rating}</span>
                      <span>({car.reviewCount} reviews)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{car.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" iconLeft={<Heart className="w-4 h-4" />}>
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" iconLeft={<Share2 className="w-4 h-4" />}>
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Key Specs */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">Key Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">Seats</p>
                    <p className="font-medium">{car.seats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">Fuel Type</p>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">Mileage</p>
                    <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-[#52525B] leading-relaxed">{car.description}</p>
            </Card>

            {/* Features */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Owner Info */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">About the Owner</h2>
              <div className="flex items-center gap-4 mb-4">
                <img src={car.owner.avatar} alt={car.owner.name} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="font-semibold text-lg">{car.owner.name}</p>
                  <div className="flex items-center gap-2 text-sm text-[#52525B]">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{car.owner.rating} ⭐</span>
                    <span>• Member since {car.owner.memberSince}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#A1A1AA]">Total Cars</p>
                  <p className="font-medium">{car.owner.totalCars}</p>
                </div>
                <div>
                  <p className="text-[#A1A1AA]">Response Rate</p>
                  <p className="font-medium">{car.owner.responseRate}%</p>
                </div>
                <div>
                  <p className="text-[#A1A1AA]">Response Time</p>
                  <p className="font-medium">{car.owner.responseTime}</p>
                </div>
              </div>
            </Card>

            {/* Reviews */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {car.reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-[#E4E4E7] pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{review.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#52525B] mb-2">{review.comment}</p>
                    <p className="text-xs text-[#A1A1AA]">{review.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-[#D97706]">${car.price}</p>
                  <p className="text-sm text-[#A1A1AA]">per day</p>
                </div>

                <div className="space-y-4 mb-6">
                  <Input
                    type="date"
                    label="Pickup Date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                  <Input
                    type="date"
                    label="Dropoff Date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                  />
                </div>

                {pickupDate && dropoffDate && (
                  <div className="border-t border-[#E4E4E7] pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#52525B]">Daily Rate</span>
                      <span>${car.price} × {Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))} days</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-[#D97706]">${totalPrice}</span>
                    </div>
                  </div>
                )}

                <Link to={`/customer/booking/new/${car.id}`}>
                  <Button className="w-full" size="lg" disabled={!pickupDate || !dropoffDate}>
                    Continue to Book
                  </Button>
                </Link>

                <div className="mt-4 space-y-2 text-xs text-[#A1A1AA] text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span>Secure booking guaranteed</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>Free cancellation up to 24 hours before pickup</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
