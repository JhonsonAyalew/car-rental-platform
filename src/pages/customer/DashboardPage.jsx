import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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
  Bell,
  HardHat,
  Truck,
  Gauge,
  Fuel,
  Shield,
  Zap,
  Sparkles,
  ArrowRight,
  Wallet,
  CalendarDays,
  Timer,
  Users,
  ThumbsUp,
  Crown,
  Gift,
  Flame
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

const CustomerDashboardPage = () => {
  const { t } = useTranslation('customerDashboard');
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recommendedEquipment, setRecommendedEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Abebe');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setTimeout(() => {
      setStats({
        totalBookings: 12,
        activeBookings: 3,
        totalSpent: 45600,
        savedEquipment: 6,
        membershipTier: 'Platinum',
        points: 2450,
        nextTier: 'Diamond',
        pointsNeeded: 550
      });

      setRecentBookings([
        {
          id: 'BK-1001',
          equipmentName: 'CAT 320 Excavator',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          startDate: '2024-04-15',
          endDate: '2024-04-20',
          status: 'upcoming',
          totalAmount: 42500,
          location: 'Addis Ababa, Ethiopia',
          hourlyRate: 1200,
          type: 'Excavator'
        },
        {
          id: 'BK-1002',
          equipmentName: 'Sinotruk HOWO 371',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10',
          startDate: '2024-04-05',
          endDate: '2024-04-10',
          status: 'completed',
          totalAmount: 24000,
          location: 'Adama, Ethiopia',
          hourlyRate: 680,
          type: 'Dump Truck'
        },
        {
          id: 'BK-1003',
          equipmentName: 'Water Bowser Manual',
          equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlLeUA0Va6oTjZX28tH3KJkd0AF27Bl7fb2DvBazhYQ&s',
          startDate: '2024-04-18',
          endDate: '2024-04-22',
          status: 'upcoming',
          totalAmount: 15200,
          location: 'Hawassa, Ethiopia',
          hourlyRate: 550,
          type: 'Water Truck'
        }
      ]);

      setRecommendedEquipment([
        {
          id: 1,
          name: 'CAT 320 Excavator',
          brand: 'Caterpillar',
          price: 8500,
          hourlyRate: 1200,
          rating: 4.9,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          location: 'Addis Ababa',
          type: 'Excavator',
          attachment: 'Shovel'
        },
        {
          id: 3,
          name: 'CAT 950 Wheel Loader',
          brand: 'Caterpillar',
          price: 7200,
          hourlyRate: 1000,
          rating: 4.9,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
          location: 'Hawassa',
          type: 'Loader',
          attachment: 'Bucket'
        },
        {
          id: 8,
          name: 'Liebherr LTM 1050 Crane',
          brand: 'Liebherr',
          price: 18000,
          hourlyRate: 2500,
          rating: 4.9,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10',
          location: 'Addis Ababa',
          type: 'Crane',
          attachment: 'Hook'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    if (status === 'upcoming') {
      return <Badge variant="approved">✓ {t('status.upcoming')}</Badge>;
    } else if (status === 'completed') {
      return <Badge variant="completed">✓ {t('status.completed')}</Badge>;
    }
    return <Badge variant="pending">{status}</Badge>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
      {/* Welcome Header with Ethiopian pattern */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7]/30 p-6">
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <path d="M100 0 L200 100 L100 200 L0 100 Z" fill="#D97706"/>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {t('welcome.greeting')}, {userName}! 👋
            </h1>
            <span className="text-2xl">🇪🇹</span>
          </div>
          <p className="text-[#52525B] text-lg">{t('welcome.subtitle')}</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
              <MapPin className="w-4 h-4 text-[#D97706]" />
              <span className="text-sm">{t('welcome.ethiopiaWide')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
              <Users className="w-4 h-4 text-[#D97706]" />
              <span className="text-sm">{t('welcome.contractors')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Ethiopian themed */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card variant="info" className="text-center group hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <Calendar className="w-6 h-6 text-[#D97706]" />
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.totalBookings}</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalBookings')}</p>
        </Card>
        
        <Card variant="info" className="text-center group hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <HardHat className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.activeBookings}</p>
          <p className="text-sm text-[#52525B]">{t('stats.activeRentals')}</p>
        </Card>
        
        <Card variant="info" className="text-center group hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{formatCurrency(stats.totalSpent)}</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalSpent')}</p>
        </Card>
        
        <Card variant="info" className="text-center group hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <Star className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.savedEquipment}</p>
          <p className="text-sm text-[#52525B]">{t('stats.savedEquipment')}</p>
        </Card>
      </div>

      {/* Membership Tier Card - Enhanced */}
      <Card className="bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#92400E] text-white mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <p className="text-sm opacity-90">{t('membership.title')}</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                {stats.membershipTier}
                <Flame className="w-5 h-5 text-yellow-300" />
              </p>
              <p className="text-sm opacity-90 mt-1">✨ {stats.points} {t('membership.pointsEarned')}</p>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-sm mb-1">
              <span>{stats.pointsNeeded} {t('membership.pointsToNext')} {stats.nextTier}</span>
              <span>{stats.points} / {stats.points + stats.pointsNeeded}</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${(stats.points / (stats.points + stats.pointsNeeded)) * 100}%` }}
              />
            </div>
            <p className="text-xs opacity-80 mt-1">{t('membership.earnPoints')}</p>
          </div>
          <Gift className="w-12 h-12 opacity-50" />
        </div>
      </Card>

      {/* Recent Bookings */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">📋 {t('recentBookings.title')}</h2>
            <p className="text-sm text-[#52525B]">{t('recentBookings.subtitle')}</p>
          </div>
          <Link to="/customer/bookings">
            <Button variant="ghost" className="group">
              {t('recentBookings.viewAll')} 
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence>
            {recentBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="flex flex-col md:flex-row gap-4 hover:shadow-lg transition-all">
                  <img 
                    src={booking.equipmentImage} 
                    alt={booking.equipmentName} 
                    className="w-full md:w-32 h-32 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.equipmentName}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#52525B]">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HardHat className="w-3 h-3" />
                            <span>{booking.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{booking.hourlyRate}/hr</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-[#52525B]" />
                        <span>{booking.startDate} → {booking.endDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4 text-[#52525B]" />
                        <span>{(new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)} {t('recentBookings.days')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wallet className="w-4 h-4 text-[#52525B]" />
                        <span className="font-semibold text-[#D97706]">{formatCurrency(booking.totalAmount)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link to={`/customer/booking/${booking.id}`}>
                        <Button size="sm" variant="ghost">{t('recentBookings.viewDetails')}</Button>
                      </Link>
                      {booking.status === 'upcoming' && (
                        <Button size="sm" variant="danger">{t('recentBookings.cancelBooking')}</Button>
                      )}
                      {booking.status === 'completed' && (
                        <Button size="sm" variant="secondary" iconLeft={<ThumbsUp className="w-3 h-3" />}>
                          {t('recentBookings.leaveReview')}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Recommended Equipment */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">🔥 {t('recommended.title')}</h2>
            <p className="text-sm text-[#52525B]">{t('recommended.subtitle')}</p>
          </div>
          <Link to="/search">
            <Button variant="ghost" className="group">
              {t('recommended.browseAll')} 
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEquipment.map((equipment, index) => (
            <motion.div
              key={equipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-[#F3F2EE]">
                  <img 
                    src={equipment.image} 
                    alt={equipment.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium">{equipment.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {equipment.type} • {equipment.attachment}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">{equipment.name}</h3>
                      <p className="text-sm text-[#52525B]">{equipment.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#D97706]">{formatCurrency(equipment.price)}</p>
                      <p className="text-xs text-[#A1A1AA]">{t('recommended.perDay')}</p>
                      <p className="text-xs text-[#10B981]">{t('recommended.or')} {formatCurrency(equipment.hourlyRate)}/{t('recommended.perHour')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-[#52525B] mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{equipment.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3" />
                      <span className="text-xs">{equipment.type}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Link to={`/equipment/${equipment.id}`}>
                      <Button className="w-full group-hover:bg-[#B45309] transition">
                        {t('recommended.viewDetails')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Tips Section - Ethiopian Construction Tips */}
      <div className="mt-12 p-6 bg-gradient-to-r from-[#D97706]/5 to-[#FEF3C7]/20 rounded-2xl border border-[#FDE68A]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#D97706] flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1A1A1A] text-lg mb-1">{t('proTip.title')}</h3>
            <p className="text-[#52525B] text-sm">
              {t('proTip.description')}
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">📞 {t('proTip.support')}</span>
              <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">🚚 {t('proTip.freeDelivery')}</span>
              <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">🔧 {t('proTip.maintenance')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
