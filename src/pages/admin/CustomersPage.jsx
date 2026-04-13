import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Search,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Download,
  RefreshCw,
  Eye,
  MessageSquare,
  Filter,
  CheckCircle,
  Clock,
  Award,
  Users
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const CustomersPage = () => {
  const { t } = useTranslation('customers');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setTimeout(() => {
      const mockCustomers = [
        {
          id: 'CUST-001',
          name: 'Abebe Bekele',
          email: 'abebe@example.com',
          phone: '+251 911 123456',
          location: 'Addis Ababa, Ethiopia',
          joinDate: '2023-06-15',
          totalBookings: 12,
          totalSpent: 185000,
          rating: 4.9,
          status: 'active',
          verified: true,
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          recentBookings: [
            { id: 'BK-1001', equipment: 'CAT 320 Excavator', date: '2024-01-20', amount: 42500 },
            { id: 'BK-1005', equipment: 'Sinotruk HOWO', date: '2024-01-10', amount: 28800 }
          ]
        },
        {
          id: 'CUST-002',
          name: 'Selam Tesfaye',
          email: 'selam@example.com',
          phone: '+251 912 345678',
          location: 'Adama, Ethiopia',
          joinDate: '2023-08-20',
          totalBookings: 8,
          totalSpent: 124000,
          rating: 4.8,
          status: 'active',
          verified: true,
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          recentBookings: [
            { id: 'BK-1002', equipment: 'Komatsu D65 Bulldozer', date: '2024-01-15', amount: 54000 }
          ]
        },
        {
          id: 'CUST-003',
          name: 'Tekle Berhan',
          email: 'tekle@example.com',
          phone: '+251 913 456789',
          location: 'Dire Dawa, Ethiopia',
          joinDate: '2023-10-10',
          totalBookings: 5,
          totalSpent: 89000,
          rating: 4.7,
          status: 'active',
          verified: true,
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          recentBookings: []
        },
        {
          id: 'CUST-004',
          name: 'Meron Desta',
          email: 'meron@example.com',
          phone: '+251 914 567890',
          location: 'Hawassa, Ethiopia',
          joinDate: '2023-11-05',
          totalBookings: 3,
          totalSpent: 45000,
          rating: 4.6,
          status: 'inactive',
          verified: false,
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          recentBookings: []
        }
      ];
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...customers];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      );
    }
    
    switch (sortBy) {
      case 'most-bookings':
        filtered.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
      case 'most-spent':
        filtered.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
        break;
      default:
        break;
    }
    
    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, sortBy, customers]);

  const handleVerifyCustomer = (customerId) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === customerId ? { ...customer, verified: true } : customer
    );
    setCustomers(updatedCustomers);
    toast.success(t('toast.verifySuccess'));
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    verified: customers.filter(c => c.verified).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgRating: (customers.reduce((sum, c) => sum + c.rating, 0) / customers.length).toFixed(1)
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
      
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{t('page.title')}</h1>
          <p className="text-[#52525B] mt-1">{t('page.subtitle')}</p>
        </div>
        <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
          {t('page.exportButton')}
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <Users className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalCustomers')}</p>
        </Card>
        <Card className="text-center">
          <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          <p className="text-sm text-[#52525B]">{t('stats.active')}</p>
        </Card>
        <Card className="text-center">
          <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{stats.verified}</p>
          <p className="text-sm text-[#52525B]">{t('stats.verified')}</p>
        </Card>
        <Card className="text-center">
          <DollarSign className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#D97706]">ETB {(stats.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalSpent')}</p>
        </Card>
        <Card className="text-center">
          <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.avgRating}</p>
          <p className="text-sm text-[#52525B]">{t('stats.avgRating')}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder={t('filters.searchPlaceholder')}
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
            <option value="all">{t('filters.statusAll')}</option>
            <option value="active">{t('filters.statusActive')}</option>
            <option value="inactive">{t('filters.statusInactive')}</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
          >
            <option value="newest">{t('filters.sortNewest')}</option>
            <option value="most-bookings">{t('filters.sortMostBookings')}</option>
            <option value="most-spent">{t('filters.sortMostSpent')}</option>
          </select>
        </div>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 p-5">
                {/* Avatar */}
                <div className="relative">
                  <img 
                    src={customer.avatar} 
                    alt={customer.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D97706]"
                  />
                  {customer.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#52525B]">
                        <Mail className="w-3 h-3" />
                        <span>{customer.email}</span>
                        <span className="text-[#E4E4E7]">|</span>
                        <Phone className="w-3 h-3" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                    <Badge variant={customer.status === 'active' ? 'approved' : 'cancelled'}>
                      {customer.status === 'active' ? t('status.active') : t('status.inactive')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#52525B]" />
                      <span>{customer.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#52525B]" />
                      <span>{t('customerCard.joinDate')} {customer.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{customer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3 pb-3 border-b border-[#E4E4E7]">
                    <div>
                      <p className="text-[#A1A1AA] text-xs">{t('customerCard.totalBookings')}</p>
                      <p className="font-semibold">{customer.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] text-xs">{t('customerCard.totalSpent')}</p>
                      <p className="font-semibold text-[#D97706]">ETB {customer.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* Recent Bookings Preview */}
                  {customer.recentBookings.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-[#A1A1AA] mb-2">{t('customerCard.recentBookings')}</p>
                      <div className="space-y-1">
                        {customer.recentBookings.slice(0, 2).map(booking => (
                          <div key={booking.id} className="flex justify-between text-xs">
                            <span className="text-[#52525B]">{booking.equipment}</span>
                            <span className="font-medium">ETB {booking.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Link to={`/admin/customers/${customer.id}`}>
                      <Button size="sm" variant="ghost" iconLeft={<Eye className="w-3 h-3" />}>
                        {t('customerCard.viewDetails')}
                      </Button>
                    </Link>
                    <Button size="sm" variant="ghost" iconLeft={<MessageSquare className="w-3 h-3" />}>
                      {t('customerCard.contact')}
                    </Button>
                    {!customer.verified && (
                      <Button size="sm" onClick={() => handleVerifyCustomer(customer.id)}>
                        {t('customerCard.verify')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="text-center py-12">
          <User className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('emptyState.title')}</h3>
          <p className="text-[#52525B]">{t('emptyState.subtitle')}</p>
        </Card>
      )}
    </div>
  );
};

export default CustomersPage;
