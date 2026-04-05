import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Car,
  Calendar,
  DollarSign,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

const CustomerDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setTimeout(() => {
      setStats({
        totalBookings: 8,
        activeBookings: 2,
        totalSpent: 1245,
        savedCars: 4,
        membershipTier: 'Gold'
      });

      setRecentBookings([
        {
          id: 'BK-1001',
          carName: 'Tesla Model 3',
          carImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100',
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          status: 'upcoming',
          totalAmount: 600,
          location: 'Los Angeles, CA'
        },
        {
          id: 'BK-1002',
          carName: 'BMW X5',
          carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100',
          startDate: '2024-01-10',
          endDate: '2024-01-15',
          status: 'completed',
          totalAmount: 750,
          location: 'New York, NY'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-[#52525B]">Ready for your next adventure?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card variant="info" className="text-center">
          <Calendar className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
          <p className="text-sm text-[#52525B]">Total Bookings</p>
        </Card>
        <Card variant="info" className="text-center">
          <Car className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.activeBookings}</p>
          <p className="text-sm text-[#52525B]">Active Bookings</p>
        </Card>
        <Card variant="info" className="text-center">
          <DollarSign className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold">${stats.totalSpent}</p>
          <p className="text-sm text-[#52525B]">Total Spent</p>
        </Card>
        <Card variant="info" className="text-center">
          <Star className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.savedCars}</p>
          <p className="text-sm text-[#52525B]">Saved Cars</p>
        </Card>
      </div>

      {/* Membership Tier */}
      <Card className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Your Membership Tier</p>
            <p className="text-2xl font-bold">{stats.membershipTier}</p>
            <p className="text-sm opacity-90 mt-1">Earn points on every booking</p>
          </div>
          <Award className="w-16 h-16 opacity-50" />
        </div>
      </Card>

      {/* Recent Bookings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <Link to="/customer/bookings">
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex gap-4">
                <img src={booking.carImage} alt={booking.carName} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.carName}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#52525B]">
                        <MapPin className="w-3 h-3" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                    <Badge variant={booking.status === 'upcoming' ? 'approved' : 'completed'}>
                      {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#52525B]" />
                      <span>{booking.startDate} - {booking.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#52525B]" />
                      <span>${booking.totalAmount}</span>
                    </div>
                  </div>
                  
                  <Link to={`/customer/booking/${booking.id}`}>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Cars */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Link to="/search">
            <Button variant="ghost" size="sm">
              Browse More <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Mercedes C-Class', price: 110, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200', rating: 4.9 },
            { name: 'Audi Q5', price: 130, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200', rating: 4.8 },
            { name: 'Toyota Camry', price: 65, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200', rating: 4.7 }
          ].map((car, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{car.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-xl font-bold text-[#D97706]">${car.price}</p>
                      <p className="text-xs text-[#A1A1AA]">per day</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{car.rating}</span>
                    </div>
                  </div>
                  <Link to="/car/1">
                    <Button size="sm" className="w-full mt-3">View Details</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
