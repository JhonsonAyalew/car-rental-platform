import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  HardHat,
  User,
  MapPin,
  Star,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronDown,
  X,
  CheckCircle,
  Clock,
  Fuel,
  Gauge,
  Truck,
  Wrench,
  Timer
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const EquipmentPage = () => {
  const { t } = useTranslation('equipmentPage');
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Ethiopian equipment data
  const equipmentData = [
    {
      id: 1,
      name: 'CAT 320 Excavator',
      brand: 'Caterpillar',
      pricePerDay: 8500,
      pricePerHour: 1200,
      rating: 4.9,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
      location: 'Addis Ababa, Ethiopia',
      type: 'Excavator',
      attachment: 'Shovel',
      weight: '20 tons',
      status: 'available',
      owner: { name: 'Getachew Alemayehu', id: 'OWN-001', email: 'getachew@example.com', phone: '+251 911 123456' },
      features: ['GPS Tracking', 'AC Cabin', 'Hammer Attachment', 'Quick Coupler'],
      timeSlots: ['8:00-12:00', '13:00-17:00', 'Full Day'],
      bookingsCount: 45,
      totalRevenue: 382500,
      featured: true
    },
    {
      id: 2,
      name: 'SANY SY335 Excavator',
      brand: 'SANY',
      pricePerDay: 7800,
      pricePerHour: 1100,
      rating: 4.8,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_0udB0zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10',
      location: 'Dire Dawa, Ethiopia',
      type: 'Excavator',
      attachment: 'Hammer',
      weight: '33 tons',
      status: 'available',
      owner: { name: 'Tigist Worku', id: 'OWN-002', email: 'tigist@example.com', phone: '+251 912 345678' },
      features: ['Hydraulic Hammer', 'Rotating Cabin', 'LED Lights'],
      timeSlots: ['8:00-12:00', '13:00-17:00', 'Full Day'],
      bookingsCount: 38,
      totalRevenue: 296400,
      featured: true
    },
    {
      id: 3,
      name: 'CAT 950 Wheel Loader',
      brand: 'Caterpillar',
      pricePerDay: 7200,
      pricePerHour: 1000,
      rating: 4.9,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
      location: 'Hawassa, Ethiopia',
      type: 'Loader',
      attachment: 'Bucket',
      weight: '25 tons',
      status: 'booked',
      owner: { name: 'Dawit Mekonnen', id: 'OWN-003', email: 'dawit@example.com', phone: '+251 913 456789' },
      features: ['High Lift', 'Ride Control', 'Auto Grease System'],
      timeSlots: ['Full Day'],
      bookingsCount: 52,
      totalRevenue: 374400,
      featured: true
    },
    {
      id: 4,
      name: 'CAT 430 Backhoe Loader',
      brand: 'Caterpillar',
      pricePerDay: 5500,
      pricePerHour: 800,
      rating: 4.7,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFwNhYDEf8xKGGY6s92m03WMHpeFLneV6V2EbC9m9BQ&s',
      location: 'Mekelle, Ethiopia',
      type: 'Backhoe Loader',
      attachment: 'Bucket + Backhoe',
      weight: '9 tons',
      status: 'maintenance',
      owner: { name: 'Helen Ayele', id: 'OWN-004', email: 'helen@example.com', phone: '+251 914 567890' },
      features: ['Extendable Dipper', 'Pilot Controls', 'ROPS Cabin'],
      timeSlots: ['8:00-12:00'],
      bookingsCount: 28,
      totalRevenue: 154000,
      featured: false
    },
    {
      id: 5,
      name: 'Komatsu D65 Bulldozer',
      brand: 'Komatsu',
      pricePerDay: 9000,
      pricePerHour: 1300,
      rating: 4.8,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10',
      location: 'Adama, Ethiopia',
      type: 'Bulldozer',
      attachment: 'Blade',
      weight: '22 tons',
      status: 'available',
      owner: { name: 'Tekle Berhan', id: 'OWN-005', email: 'tekle@example.com', phone: '+251 915 678901' },
      features: ['GPS Grade Control', 'Ripper Attachment', 'Air Suspension Seat'],
      timeSlots: ['8:00-12:00', '13:00-17:00', 'Full Day'],
      bookingsCount: 34,
      totalRevenue: 306000,
      featured: true
    },
    {
      id: 6,
      name: 'CAT 140M Motor Grader',
      brand: 'Caterpillar',
      pricePerDay: 8000,
      pricePerHour: 1150,
      rating: 4.8,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6U-WSl2JQr17KXXFcrdCV_WDoiCgiN1tmcJT5BKCDSQ&s=10',
      location: 'Bahir Dar, Ethiopia',
      type: 'Grader',
      attachment: 'Blade',
      weight: '15 tons',
      status: 'available',
      owner: { name: 'Meron Desta', id: 'OWN-006', email: 'meron@example.com', phone: '+251 916 789012' },
      features: ['Articulated Frame', 'Auto-Shift Transmission', 'Climate Control'],
      timeSlots: ['8:00-12:00', 'Full Day'],
      bookingsCount: 22,
      totalRevenue: 176000,
      featured: false
    },
    {
      id: 7,
      name: 'Liebherr LTM 1050 Crane',
      brand: 'Liebherr',
      pricePerDay: 18000,
      pricePerHour: 2500,
      rating: 4.9,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10',
      location: 'Addis Ababa, Ethiopia',
      type: 'Crane',
      attachment: 'Hook',
      weight: '50 tons',
      status: 'booked',
      owner: { name: 'Abebe Bekele', id: 'OWN-007', email: 'abebe@example.com', phone: '+251 917 890123' },
      features: ['Telescopic Boom', 'Load Moment Indicator', 'Outriggers'],
      timeSlots: ['Full Day'],
      bookingsCount: 15,
      totalRevenue: 270000,
      featured: true
    },
    {
      id: 8,
      name: 'Sinotruk HOWO 371',
      brand: 'Sinotruk',
      pricePerDay: 4800,
      pricePerHour: 680,
      rating: 4.6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10',
      location: 'Addis Ababa, Ethiopia',
      type: 'Dump Truck',
      attachment: 'Tipper',
      weight: '25 tons',
      status: 'available',
      owner: { name: 'Selam Tesfaye', id: 'OWN-008', email: 'selam@example.com', phone: '+251 918 901234' },
      features: ['Hydraulic Tipper', 'Air Brakes', 'Heavy Duty Suspension'],
      timeSlots: ['8:00-12:00', '13:00-17:00', 'Full Day'],
      bookingsCount: 67,
      totalRevenue: 321600,
      featured: true
    }
  ];

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    setLoading(true);
    setTimeout(() => {
      setEquipment(equipmentData);
      setFilteredEquipment(equipmentData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let filtered = [...equipment];
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(e => e.type === typeFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortBy) {
      case 'price-high':
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.bookingsCount - a.bookingsCount);
        break;
      default:
        break;
    }
    
    setFilteredEquipment(filtered);
  }, [searchTerm, typeFilter, statusFilter, sortBy, equipment]);

  const getStatusBadge = (status) => {
    const badges = {
      available: <Badge variant="approved">✓ {t('status.available')}</Badge>,
      booked: <Badge variant="pending">📅 {t('status.booked')}</Badge>,
      maintenance: <Badge variant="rejected">🔧 {t('status.maintenance')}</Badge>
    };
    return badges[status];
  };

  const handleDeleteEquipment = async () => {
    toast.loading('Deleting equipment...', { id: 'delete' });
    setTimeout(() => {
      const updatedEquipment = equipment.filter(e => e.id !== selectedEquipment.id);
      setEquipment(updatedEquipment);
      toast.success('Equipment deleted successfully!', { id: 'delete' });
      setShowDeleteModal(false);
      setSelectedEquipment(null);
    }, 1500);
  };

  const handleStatusChange = async (equipmentId, newStatus) => {
    const updatedEquipment = equipment.map(eq => 
      eq.id === equipmentId ? { ...eq, status: newStatus } : eq
    );
    setEquipment(updatedEquipment);
   
  };

  const equipmentTypes = [...new Set(equipment.map(e => e.type))];
  const statuses = ['available', 'booked', 'maintenance'];

  const stats = {
    total: equipment.length,
    available: equipment.filter(e => e.status === 'available').length,
    booked: equipment.filter(e => e.status === 'booked').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    totalRevenue: equipment.reduce((sum, e) => sum + e.totalRevenue, 0),
    avgRating: (equipment.reduce((sum, e) => sum + e.rating, 0) / equipment.length).toFixed(1)
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{t('header.title')}</h1>
          <p className="text-[#52525B] mt-1">{t('header.subtitle')}</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/admin/equipment/add">
            <Button iconLeft={<Plus className="w-4 h-4" />}>
              {t('header.addEquipment')}
            </Button>
          </Link>
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            {t('header.export')}
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <HardHat className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalEquipment')}</p>
        </Card>
        <Card className="text-center">
          <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          <p className="text-sm text-[#52525B]">{t('stats.available')}</p>
        </Card>
        <Card className="text-center">
          <Calendar className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">{stats.booked}</p>
          <p className="text-sm text-[#52525B]">{t('stats.booked')}</p>
        </Card>
        <Card className="text-center">
          <Wrench className="w-6 h-6 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-600">{stats.maintenance}</p>
          <p className="text-sm text-[#52525B]">{t('stats.maintenance')}</p>
        </Card>
        <Card className="text-center">
          <DollarSign className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#D97706]">ETB {(stats.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalRevenue')}</p>
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
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">{t('filters.allTypes')}</option>
            {equipmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">{t('filters.allStatus')}</option>
            <option value="available">{t('status.available')}</option>
            <option value="booked">{t('status.booked')}</option>
            <option value="maintenance">{t('status.maintenance')}</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="newest">{t('filters.sortBy.newest')}</option>
            <option value="price-high">{t('filters.sortBy.priceHigh')}</option>
            <option value="price-low">{t('filters.sortBy.priceLow')}</option>
            <option value="rating">{t('filters.sortBy.rating')}</option>
            <option value="popular">{t('filters.sortBy.popular')}</option>
          </select>
        </div>
      </Card>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEquipment.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#D97706]/10 to-[#FEF3C7]/30">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium">{item.rating}</span>
                    </div>
                  </div>
                  {item.featured && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3 fill-white" />
                        {t('badges.featured')}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <HardHat className="w-3 h-3" />
                      {item.type}
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-[#1A1A1A]">{item.name}</h3>
                      <p className="text-sm text-[#52525B]">{item.brand} • {item.weight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#D97706]">ETB {item.pricePerDay.toLocaleString()}</p>
                      <p className="text-xs text-[#A1A1AA]">{t('card.perDay')}</p>
                      <p className="text-xs text-[#10B981]">{t('card.perHour')} ETB {item.pricePerHour}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-[#52525B] mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{item.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3" />
                      <span className="text-xs">{item.weight}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{item.bookingsCount} {t('card.bookings')}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedEquipment(item);
                        setShowViewModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t('card.view')}
                    </Button>
                    <Link to={`/admin/equipment/edit/${item.id}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-1" />
                        {t('card.edit')}
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setSelectedEquipment(item);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Time Slots Quick View */}
                  <div className="mt-3 pt-3 border-t border-[#E4E4E7]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Timer className="w-3 h-3 text-[#D97706]" />
                        <span className="text-xs text-[#52525B]">{t('card.timeSlots')}</span>
                      </div>
                      <div className="flex gap-1">
                        {item.timeSlots.slice(0, 2).map((slot, idx) => (
                          <span key={idx} className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full">
                            {slot}
                          </span>
                        ))}
                        {item.timeSlots.length > 2 && (
                          <span className="text-xs bg-[#F3F2EE] text-[#52525B] px-2 py-0.5 rounded-full">
                            +{item.timeSlots.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEquipment.length === 0 && (
        <Card className="text-center py-12">
          <HardHat className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('empty.title')}</h3>
          <p className="text-[#52525B]">{t('empty.subtitle')}</p>
        </Card>
      )}

      {/* View Equipment Modal */}
      {showViewModal && selectedEquipment && (
        <Modal onClose={() => setShowViewModal(false)}>
          <div className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4">
              <h2 className="text-2xl font-bold">{selectedEquipment.name}</h2>
              <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <img 
              src={selectedEquipment.image} 
              alt={selectedEquipment.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-[#D97706]" />
                  {t('modal.view.equipmentDetails')}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.brand')}:</span>
                    <span className="font-medium">{selectedEquipment.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.type')}:</span>
                    <span className="font-medium">{selectedEquipment.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.attachment')}:</span>
                    <span className="font-medium">{selectedEquipment.attachment}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.weight')}:</span>
                    <span className="font-medium">{selectedEquipment.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.location')}:</span>
                    <span className="font-medium">{selectedEquipment.location}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D97706]" />
                  {t('modal.view.ownerInfo')}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.ownerName')}:</span>
                    <span className="font-medium">{selectedEquipment.owner.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.ownerEmail')}:</span>
                    <span className="font-medium">{selectedEquipment.owner.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.ownerPhone')}:</span>
                    <span className="font-medium">{selectedEquipment.owner.phone}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold mt-4 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D97706]" />
                  {t('modal.view.pricingStats')}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.dailyRate')}:</span>
                    <span className="font-medium text-[#D97706]">ETB {selectedEquipment.pricePerDay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.hourlyRate')}:</span>
                    <span className="font-medium">ETB {selectedEquipment.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('details.totalBookings')}:</span>
                    <span className="font-medium">{selectedEquipment.bookingsCount}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B]">{t('details.totalRevenue')}:</span>
                    <span className="font-medium text-green-600">ETB {selectedEquipment.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold mb-2">{t('modal.view.features')}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedEquipment.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold mb-2">{t('modal.view.availableTimeSlots')}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedEquipment.timeSlots.map((slot, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#D97706]/10 text-[#D97706] rounded-lg text-sm font-medium">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <select
                value={selectedEquipment.status}
                onChange={(e) => {
                  handleStatusChange(selectedEquipment.id, e.target.value);
                  setSelectedEquipment({ ...selectedEquipment, status: e.target.value });
                }}
                className="flex-1 px-3 py-2 border border-[#E4E4E7] rounded-lg"
              >
                <option value="available">{t('status.available')}</option>
                <option value="booked">{t('status.booked')}</option>
                <option value="maintenance">{t('status.maintenance')}</option>
              </select>
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                {t('modal.view.close')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEquipment && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">{t('modal.delete.title')}</h2>
            <p className="text-[#52525B] mb-6">
              {t('modal.delete.confirm')} "{selectedEquipment.name}"? {t('modal.delete.warning')}
            </p>
            <div className="flex gap-3">
              <Button variant="danger" onClick={handleDeleteEquipment} className="flex-1">
                {t('modal.delete.yesDelete')}
              </Button>
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)} className="flex-1">
                {t('modal.delete.cancel')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EquipmentPage;
