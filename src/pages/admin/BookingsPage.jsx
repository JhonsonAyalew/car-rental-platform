import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Search,
  Calendar,
  DollarSign,
  User,
  Car,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  MessageSquare
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    setTimeout(() => {
      const mockBookings = [
        {
          id: 'BK-1001',
          customer: { name: 'John Smith', email: 'john@example.com', phone: '+1 234 567 8900' },
          car: { name: 'Tesla Model 3', brand: 'Tesla', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100' },
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          pickupTime: '10:00 AM',
          dropoffTime: '6:00 PM',
          totalAmount: 600,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2024-01-15T10:30:00Z',
          location: 'Los Angeles, CA'
        },
        {
          id: 'BK-1002',
          customer: { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234 567 8901' },
          car: { name: 'Toyota Camry', brand: 'Toyota', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100' },
          startDate: '2024-01-21',
          endDate: '2024-01-23',
          pickupTime: '9:00 AM',
          dropoffTime: '5:00 PM',
          totalAmount: 195,
          status: 'pending',
          paymentStatus: 'pending',
          createdAt: '2024-01-18T14:15:00Z',
          location: 'New York, NY'
        },
        {
          id: 'BK-1003',
          customer: { name: 'Mike Brown', email: 'mike@example.com', phone: '+1 234 567 8902' },
          car: { name: 'BMW X5', brand: 'BMW', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100' },
          startDate: '2024-01-19',
          endDate: '2024-01-22',
          pickupTime: '11:00 AM',
          dropoffTime: '7:00 PM',
          totalAmount: 380,
          status: 'completed',
          paymentStatus: 'paid',
          createdAt: '2024-01-10T09:00:00Z',
          location: 'Chicago, IL'
        },
        {
          id: 'BK-1004',
          customer: { name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234 567 8903' },
          car: { name: 'Honda CR-V', brand: 'Honda', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100' },
          startDate: '2024-01-22',
          endDate: '2024-01-28',
          pickupTime: '8:00 AM',
          dropoffTime: '4:00 PM',
          totalAmount: 385,
          status: 'cancelled',
          paymentStatus: 'refunded',
          createdAt: '2024-01-19T16:20:00Z',
          location: 'Miami, FL'
        }
      ];
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...bookings];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (dateRange !== 'all') {
      const now = new Date();
      const rangeMap = {
        today: now.setHours(0,0,0,0),
        week: new Date(now.setDate(now.getDate() - 7)),
        month: new Date(now.setMonth(now.getMonth() - 1))
      };
      filtered = filtered.filter(b => new Date(b.createdAt) >= rangeMap[dateRange]);
    }
    
    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, dateRange, bookings]);

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: <Badge variant="approved">✓ Confirmed</Badge>,
      pending: <Badge variant="pending">⏳ Pending</Badge>,
      completed: <Badge variant="completed">✓ Completed</Badge>,
      cancelled: <Badge variant="cancelled">✗ Cancelled</Badge>
    };
    return badges[status];
  };

  const getPaymentBadge = (status) => {
    const badges = {
      paid: <Badge variant="approved">Paid</Badge>,
      pending: <Badge variant="pending">Pending</Badge>,
      refunded: <Badge variant="cancelled">Refunded</Badge>
    };
    return badges[status];
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    toast.success(`Booking ${newStatus} successfully!`);
  };

  const stats = {
    total: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">All Bookings</h1>
          <p className="text-[#52525B] mt-1">Manage and track all rental bookings</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="ghost" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={fetchBookings}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
          <p className="text-sm text-[#52525B]">Total Bookings</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#D97706]">${stats.totalRevenue}</p>
          <p className="text-sm text-[#52525B]">Total Revenue</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          <p className="text-sm text-[#52525B]">Confirmed</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-[#52525B]">Pending</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
          <p className="text-sm text-[#52525B]">Completed</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by ID, customer, or car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-medium transition">
            <div className="flex flex-wrap gap-4">
              <img src={booking.car.image} alt={booking.car.name} className="w-24 h-24 rounded-lg object-cover" />
              
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{booking.car.name}</h3>
                    <p className="text-sm text-[#52525B]">{booking.car.brand}</p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#52525B]" />
                    <span>{booking.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#52525B]" />
                    <span>{booking.startDate} to {booking.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-[#52525B]" />
                    <span>${booking.totalAmount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#52525B]" />
                    <span>{booking.pickupTime}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {getPaymentBadge(booking.paymentStatus)}
                  <Button size="sm" variant="ghost" iconLeft={<Eye className="w-3 h-3" />}>
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" iconLeft={<MessageSquare className="w-3 h-3" />}>
                    Contact Customer
                  </Button>
                  {booking.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => handleUpdateStatus(booking.id, 'confirmed')}>
                        Confirm
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleUpdateStatus(booking.id, 'cancelled')}>
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
