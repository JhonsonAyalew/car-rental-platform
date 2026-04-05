import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Clock,
  ChevronRight,
  Filter
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setTimeout(() => {
      const mockBookings = [
        {
          id: 'BK-1001',
          carName: 'Tesla Model 3',
          carImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100',
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          status: 'upcoming',
          totalAmount: 600,
          location: 'Los Angeles, CA',
          owner: { name: 'Sarah Johnson', phone: '+1 234 567 8900' },
          pickupInstructions: 'Parking garage Level 2, Spot #15'
        },
        {
          id: 'BK-1002',
          carName: 'BMW X5',
          carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100',
          startDate: '2024-01-10',
          endDate: '2024-01-15',
          status: 'completed',
          totalAmount: 750,
          location: 'New York, NY',
          owner: { name: 'Mike Brown', phone: '+1 234 567 8901' }
        },
        {
          id: 'BK-1003',
          carName: 'Mercedes C-Class',
          carImage: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100',
          startDate: '2024-02-01',
          endDate: '2024-02-05',
          status: 'upcoming',
          totalAmount: 440,
          location: 'Miami, FL',
          owner: { name: 'David Wilson', phone: '+1 234 567 8902' }
        }
      ];
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">My Bookings</h1>
      <p className="text-[#52525B] mb-6">View and manage all your rental bookings</p>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#E4E4E7]">
        {[
          { value: 'all', label: 'All' },
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 font-medium transition relative ${filter === tab.value ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'}`}
          >
            {tab.label}
            {filter === tab.value && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="flex flex-col md:flex-row gap-4">
              <img src={booking.carImage} alt={booking.carName} className="w-full md:w-32 h-32 rounded-lg object-cover" />
              
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
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
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#52525B]" />
                    <span>{booking.startDate} - {booking.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-[#52525B]" />
                    <span>${booking.totalAmount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#52525B]" />
                    <span>Owner: {booking.owner.name}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/customer/booking/${booking.id}`}>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </Link>
                  {booking.status === 'upcoming' && (
                    <Button size="sm" variant="danger">Cancel Booking</Button>
                  )}
                  {booking.status === 'completed' && (
                    <Button size="sm" variant="secondary">Leave a Review</Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="text-center py-12">
          <Calendar className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
          <p className="text-[#52525B] mb-4">You haven't made any bookings yet</p>
          <Link to="/search">
            <Button>Browse Cars</Button>
          </Link>
        </Card>
      )}
    </div>
  );
};

export default MyBookingsPage;
