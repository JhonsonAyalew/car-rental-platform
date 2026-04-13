import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Clock,
  ChevronRight,
  Filter,
  Package,
  Wrench,
  HardHat,
  Timer,
  Wallet,
  CalendarDays,
  Phone,
  Search,
  MessageCircle,
  X,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Input from '../../components/ui/Input';

const MyBookingsPage = () => {
  const { t } = useTranslation('myBookings');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setTimeout(() => {
      const mockBookings = [
        {
          id: 'BK-1001',
          equipmentName: 'CAT 320 Excavator',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          brand: 'Caterpillar',
          type: 'Excavator',
          attachment: 'Shovel',
          weight: '20 tons',
          startDate: '2024-04-15',
          endDate: '2024-04-20',
          status: 'upcoming',
          totalAmount: 42500,
          dailyRate: 8500,
          hourlyRate: 1200,
          location: 'Addis Ababa, Ethiopia',
          owner: { 
            name: 'Abebe Construction', 
            phone: '+251 911 234567',
            email: 'abebe@construction.com',
            rating: 4.9
          },
          pickupInstructions: 'Pickup location: Bole International Market, near Gate 15',
          cancellationDeadline: '2024-04-14',
          rentalDays: 5
        },
        {
          id: 'BK-1002',
          equipmentName: 'Sinotruk HOWO 371',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10',
          brand: 'Sinotruk',
          type: 'Dump Truck',
          attachment: 'Tipper',
          weight: '25 tons',
          startDate: '2024-04-05',
          endDate: '2024-04-10',
          status: 'completed',
          totalAmount: 24000,
          dailyRate: 4800,
          hourlyRate: 680,
          location: 'Adama, Ethiopia',
          owner: { 
            name: 'Adama Transport', 
            phone: '+251 922 345678',
            email: 'adama@transport.com',
            rating: 4.7
          },
          rentalDays: 5,
          reviewGiven: false
        },
        {
          id: 'BK-1003',
          equipmentName: 'Water Bowser Manual',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlLeUA0Va6oTjZX28tH3KJkd0AF27Bl7fb2DvBazhYQ&s',
          brand: 'HOWO',
          type: 'Water Truck',
          attachment: 'Manual Sprinkler',
          weight: '18 tons',
          startDate: '2024-04-18',
          endDate: '2024-04-22',
          status: 'upcoming',
          totalAmount: 15200,
          dailyRate: 3800,
          hourlyRate: 550,
          location: 'Hawassa, Ethiopia',
          owner: { 
            name: 'Hawassa Water Services', 
            phone: '+251 933 456789',
            email: 'hawassa@water.com',
            rating: 4.5
          },
          pickupInstructions: 'Pickup location: Hawassa Industrial Park, Gate 3',
          cancellationDeadline: '2024-04-17',
          rentalDays: 4
        },
        {
          id: 'BK-1004',
          equipmentName: 'Liebherr LTM 1050 Crane',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10',
          brand: 'Liebherr',
          type: 'Crane',
          attachment: 'Hook',
          weight: '50 tons',
          startDate: '2024-03-20',
          endDate: '2024-03-25',
          status: 'cancelled',
          totalAmount: 90000,
          dailyRate: 18000,
          hourlyRate: 2500,
          location: 'Addis Ababa, Ethiopia',
          owner: { 
            name: 'Tower Crane PLC', 
            phone: '+251 944 567890',
            email: 'tower@crane.com',
            rating: 4.9
          },
          rentalDays: 5,
          cancellationReason: 'Project postponed by client'
        },
        {
          id: 'BK-1005',
          equipmentName: 'CAT 950 Wheel Loader',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
          brand: 'Caterpillar',
          type: 'Loader',
          attachment: 'Bucket',
          weight: '25 tons',
          startDate: '2024-03-10',
          endDate: '2024-03-15',
          status: 'completed',
          totalAmount: 36000,
          dailyRate: 7200,
          hourlyRate: 1000,
          location: 'Hawassa, Ethiopia',
          owner: { 
            name: 'Hawassa Construction', 
            phone: '+251 955 678901',
            email: 'hawassa@construction.com',
            rating: 4.8
          },
          rentalDays: 5,
          reviewGiven: true,
          reviewRating: 5,
          reviewComment: 'Excellent equipment, very reliable!'
        }
      ];
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...bookings];
    
    if (filter !== 'all') {
      filtered = filtered.filter(booking => booking.status === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBookings(filtered);
  }, [filter, searchTerm, bookings]);

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: <Badge variant="approved">✓ {t('status.upcoming')}</Badge>,
      completed: <Badge variant="completed">✓ {t('status.completed')}</Badge>,
      cancelled: <Badge variant="cancelled">✗ {t('status.cancelled')}</Badge>,
      ongoing: <Badge variant="pending">🔄 {t('status.ongoing')}</Badge>
    };
    return badges[status] || badges.upcoming;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ET', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return t('bookingCard.started');
    if (diffDays === 0) return t('bookingCard.today');
    return `${diffDays} ${t('bookingCard.daysRemaining')}`;
  };

  const handleCancelBooking = (booking) => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    // API call to cancel booking
    const updatedBookings = bookings.map(b => 
      b.id === booking.id 
        ? { ...b, status: 'cancelled', cancellationReason: cancelReason }
        : b
    );
    setBookings(updatedBookings);
    setShowCancelModal(null);
    setCancelReason('');
    alert('Booking cancelled successfully');
  };

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter(b => b.status === 'upcoming').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalSpent: bookings.reduce((sum, b) => sum + b.totalAmount, 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-[#F9F8F6] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">📋 {t('page.title')}</h1>
          <p className="text-[#52525B]">{t('page.subtitle')}</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
            <p className="text-sm text-[#52525B]">{t('stats.totalBookings')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.upcoming}</p>
            <p className="text-sm text-[#52525B]">{t('stats.upcoming')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            <p className="text-sm text-[#52525B]">{t('stats.completed')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-[#D97706]">{formatCurrency(stats.totalSpent)}</p>
            <p className="text-sm text-[#52525B]">{t('stats.totalSpent')}</p>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder={t('filters.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
          </div>
        </Card>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E4E4E7]">
          {[
            { value: 'all', label: t('filters.all'), count: stats.total },
            { value: 'upcoming', label: t('filters.upcoming'), count: stats.upcoming },
            { value: 'completed', label: t('filters.completed'), count: stats.completed },
            { value: 'cancelled', label: t('filters.cancelled'), count: stats.cancelled }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 font-medium transition relative flex items-center gap-2 ${
                filter === tab.value ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === tab.value ? 'bg-[#D97706] text-white' : 'bg-[#F3F2EE] text-[#52525B]'
              }`}>
                {tab.count}
              </span>
              {filter === tab.value && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />
              )}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Equipment Image */}
                    <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-[#F3F2EE] flex-shrink-0">
                      <img 
                        src={booking.equipmentImage} 
                        alt={booking.equipmentName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/128x128?text=No+Image';
                        }}
                      />
                    </div>
                    
                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">{booking.equipmentName}</h3>
                            <p className="text-sm text-[#52525B]">{booking.brand}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#52525B] mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HardHat className="w-3 h-3" />
                              <span>{booking.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Wrench className="w-3 h-3" />
                              <span>{booking.attachment}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              <span>{booking.weight}</span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      {/* Date and Price Info */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4 text-[#52525B]" />
                          <span>{formatDate(booking.startDate)} → {formatDate(booking.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="w-4 h-4 text-[#52525B]" />
                          <span>{booking.rentalDays} {t('bookingCard.days')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wallet className="w-4 h-4 text-[#52525B]" />
                          <span className="font-semibold text-[#D97706]">{formatCurrency(booking.totalAmount)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{booking.owner.rating} ⭐</span>
                        </div>
                      </div>
                      
                      {/* Owner Info */}
                      <div className="bg-[#F9F8F6] rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium mb-1">Owner: {booking.owner.name}</p>
                        <div className="flex items-center gap-3 text-xs text-[#52525B]">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{booking.owner.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{t('bookingCard.contactOwner')}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pickup Instructions for upcoming bookings */}
                      {booking.status === 'upcoming' && booking.pickupInstructions && (
                        <div className="bg-[#FEF3C7] rounded-lg p-2 mb-3 text-sm">
                          <p className="text-[#92400E]">📌 {booking.pickupInstructions}</p>
                          <p className="text-xs text-[#92400E] mt-1">
                            ⏰ {t('bookingCard.cancellationDeadline')}: {formatDate(booking.cancellationDeadline)}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            📍 {getDaysRemaining(booking.startDate)}
                          </p>
                        </div>
                      )}
                      
                      {/* Review for completed bookings */}
                      {booking.status === 'completed' && !booking.reviewGiven && (
                        <div className="bg-[#DBEAFE] rounded-lg p-2 mb-3 text-sm">
                          <p className="text-[#1E40AF]">⭐ {t('bookingCard.shareExperience')}</p>
                          <p className="text-xs text-[#1E40AF]">{t('bookingCard.feedbackHelps')}</p>
                        </div>
                      )}
                      
                      {booking.status === 'completed' && booking.reviewGiven && (
                        <div className="bg-[#DCFCE7] rounded-lg p-2 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < booking.reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-[#166534] mt-1">"{booking.reviewComment}"</p>
                        </div>
                      )}
                      
                      {/* Cancellation Reason */}
                      {booking.status === 'cancelled' && booking.cancellationReason && (
                        <div className="bg-[#FEE2E2] rounded-lg p-2 mb-3 text-sm">
                          <p className="text-[#991B1B]">⚠️ {t('bookingCard.cancelledReason')}: {booking.cancellationReason}</p>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Link to={`/customer/booking/${booking.id}`}>
                          <Button size="sm" variant="ghost">{t('bookingCard.viewDetails')}</Button>
                        </Link>
                        {booking.status === 'upcoming' && (
                          <Button 
                            size="sm" 
                            variant="danger" 
                            onClick={() => setShowCancelModal(booking)}
                          >
                            {t('bookingCard.cancelBooking')}
                          </Button>
                        )}
                        {booking.status === 'completed' && !booking.reviewGiven && (
                          <Button size="sm" variant="secondary">
                            {t('bookingCard.writeReview')}
                          </Button>
                        )}
                        {booking.status === 'upcoming' && (
                          <Button size="sm" variant="secondary">
                            {t('bookingCard.contactSupport')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <Card className="text-center py-12">
            <Calendar className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('emptyState.title')}</h3>
            <p className="text-[#52525B] mb-4">
              {searchTerm ? t('emptyState.adjustSearch') : t('emptyState.noBookingsYet')}
            </p>
            {!searchTerm && (
              <Link to="/search">
                <Button>{t('emptyState.browseButton')}</Button>
              </Link>
            )}
          </Card>
        )}
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl max-w-md w-full shadow-strong"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t('cancelModal.title')}</h2>
                <button onClick={() => setShowCancelModal(null)}>
                  <X className="w-5 h-5 text-[#A1A1AA]" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-[#52525B] mb-2">
                  Are you sure you want to cancel <strong>{showCancelModal.equipmentName}</strong>?
                </p>
                <p className="text-sm text-red-600 mb-4">
                  ⚠️ {t('cancelModal.warning')}
                </p>
                
                <label className="block text-sm font-medium mb-2">{t('cancelModal.reasonLabel')}</label>
                <textarea
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706]"
                  rows="3"
                  placeholder={t('cancelModal.reasonPlaceholder')}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="danger" 
                  className="flex-1"
                  onClick={() => handleCancelBooking(showCancelModal)}
                >
                  {t('cancelModal.confirmButton')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex-1"
                  onClick={() => setShowCancelModal(null)}
                >
                  {t('cancelModal.cancelButton')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
