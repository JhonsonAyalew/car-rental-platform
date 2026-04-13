import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Car,
  User,
  MapPin,
  Star,
  AlertCircle,
  Download,
  RefreshCw,
  X,
  DollarSign
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const CarListingsPage = () => {
  const { t } = useTranslation('carListings');
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    setLoading(true);
    setTimeout(() => {
      const mockCars = [
        {
          id: 'CAR-001',
          name: 'Tesla Model 3',
          brand: 'Tesla',
          model: 'Model 3',
          year: 2023,
          color: 'White',
          pricePerDay: 120,
          images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200'],
          status: 'available',
          owner: { name: 'Sarah Johnson', id: 'OWN-001', email: 'sarah@example.com' },
          location: 'Los Angeles, CA',
          rating: 4.9,
          totalBookings: 45,
          totalRevenue: 12500,
          transmission: 'Automatic',
          seats: 5,
          featured: true,
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'CAR-002',
          name: 'Toyota Camry',
          brand: 'Toyota',
          model: 'Camry',
          year: 2022,
          color: 'Silver',
          pricePerDay: 65,
          images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200'],
          status: 'available',
          owner: { name: 'John Smith', id: 'OWN-002', email: 'john@example.com' },
          location: 'New York, NY',
          rating: 4.7,
          totalBookings: 89,
          totalRevenue: 18500,
          transmission: 'Automatic',
          seats: 5,
          featured: false,
          createdAt: '2024-01-10T14:30:00Z'
        },
        {
          id: 'CAR-003',
          name: 'BMW X5',
          brand: 'BMW',
          model: 'X5',
          year: 2023,
          color: 'Black',
          pricePerDay: 150,
          images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200'],
          status: 'booked',
          owner: { name: 'Mike Brown', id: 'OWN-003', email: 'mike@example.com' },
          location: 'Chicago, IL',
          rating: 4.8,
          totalBookings: 34,
          totalRevenue: 15200,
          transmission: 'Automatic',
          seats: 5,
          featured: true,
          createdAt: '2024-01-05T09:15:00Z'
        },
        {
          id: 'CAR-004',
          name: 'Honda CR-V',
          brand: 'Honda',
          model: 'CR-V',
          year: 2022,
          color: 'Blue',
          pricePerDay: 75,
          images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200'],
          status: 'maintenance',
          owner: { name: 'Emily Davis', id: 'OWN-004', email: 'emily@example.com' },
          location: 'Miami, FL',
          rating: 4.6,
          totalBookings: 67,
          totalRevenue: 15600,
          transmission: 'Automatic',
          seats: 5,
          featured: false,
          createdAt: '2024-01-20T11:45:00Z'
        },
        {
          id: 'CAR-005',
          name: 'Mercedes C-Class',
          brand: 'Mercedes',
          model: 'C-Class',
          year: 2023,
          color: 'Black',
          pricePerDay: 110,
          images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200'],
          status: 'available',
          owner: { name: 'David Wilson', id: 'OWN-005', email: 'david@example.com' },
          location: 'San Francisco, CA',
          rating: 5.0,
          totalBookings: 23,
          totalRevenue: 8900,
          transmission: 'Automatic',
          seats: 5,
          featured: true,
          createdAt: '2024-01-18T08:20:00Z'
        }
      ];
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...cars];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'popular':
        filtered.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
      default:
        break;
    }
    
    setFilteredCars(filtered);
  }, [searchTerm, statusFilter, sortBy, cars]);

  const getStatusBadge = (status) => {
    const badges = {
      available: <Badge variant="approved">✓ {t('status.available')}</Badge>,
      booked: <Badge variant="pending">📅 {t('status.booked')}</Badge>,
      maintenance: <Badge variant="rejected">🔧 {t('status.maintenance')}</Badge>,
      unavailable: <Badge variant="cancelled">✗ {t('status.unavailable')}</Badge>
    };
    return badges[status] || badges.available;
  };

  const handleDeleteCar = async () => {
    toast.loading(t('messages.deleting'), { id: 'delete' });
    setTimeout(() => {
      const updatedCars = cars.filter(c => c.id !== selectedCar.id);
      setCars(updatedCars);
      toast.success(t('messages.deleteSuccess'), { id: 'delete' });
      setShowDeleteModal(false);
      setSelectedCar(null);
    }, 1500);
  };

  const handleStatusChange = async (carId, newStatus) => {
    const updatedCars = cars.map(car => 
      car.id === carId ? { ...car, status: newStatus } : car
    );
    setCars(updatedCars);
    toast.success(t('messages.statusUpdated', { status: t(`status.${newStatus}`) }));
  };

  const stats = {
    total: cars.length,
    available: cars.filter(c => c.status === 'available').length,
    booked: cars.filter(c => c.status === 'booked').length,
    maintenance: cars.filter(c => c.status === 'maintenance').length,
    totalRevenue: cars.reduce((sum, car) => sum + car.totalRevenue, 0),
    avgRating: (cars.reduce((sum, car) => sum + car.rating, 0) / cars.length).toFixed(1)
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{t('page.title')}</h1>
          <p className="text-[#52525B] mt-1">{t('page.subtitle')}</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/admin/cars/add">
            <Button iconLeft={<Plus className="w-4 h-4" />}>
              {t('buttons.addNew')}
            </Button>
          </Link>
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            {t('buttons.export')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalCars')}</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          <p className="text-sm text-[#52525B]">{t('stats.available')}</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.booked}</p>
          <p className="text-sm text-[#52525B]">{t('stats.booked')}</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-600">{stats.maintenance}</p>
          <p className="text-sm text-[#52525B]">{t('stats.maintenance')}</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#D97706]">${(stats.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalRevenue')}</p>
        </Card>
      </div>

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
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">{t('filters.allStatus')}</option>
            <option value="available">{t('filters.available')}</option>
            <option value="booked">{t('filters.booked')}</option>
            <option value="maintenance">{t('filters.maintenance')}</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="newest">{t('filters.newest')}</option>
            <option value="oldest">{t('filters.oldest')}</option>
            <option value="price-high">{t('filters.priceHigh')}</option>
            <option value="price-low">{t('filters.priceLow')}</option>
            <option value="popular">{t('filters.popular')}</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-medium transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.images[0]} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  {car.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="approved">⭐ {t('card.featured')}</Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(car.status)}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-[#1A1A1A]">{car.name}</h3>
                      <p className="text-sm text-[#52525B]">{car.year} • {car.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#D97706]">${car.pricePerDay}</p>
                      <p className="text-xs text-[#A1A1AA]">{t('card.perDay')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-[#52525B] mb-3">
                    <div className="flex items-center gap-1">
                      <Car className="w-3 h-3" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{car.seats} {t('card.seats')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{car.location.split(',')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{car.rating}</span>
                      <span className="text-[#A1A1AA]">({car.totalBookings} {t('card.bookings')})</span>
                    </div>
                    <div className="text-[#52525B]">
                      <span className="font-medium">${car.totalRevenue}</span> {t('card.earned')}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedCar(car);
                        setShowViewModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t('card.view')}
                    </Button>
                    <Link to={`/admin/cars/edit/${car.id}`} className="flex-1">
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
                        setSelectedCar(car);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View Car Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)}>
        {selectedCar && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedCar.name}</h2>
              <button onClick={() => setShowViewModal(false)}>
                <X className="w-5 h-5 text-[#A1A1AA]" />
              </button>
            </div>
            
            <img 
              src={selectedCar.images[0]} 
              alt={selectedCar.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">{t('modal.carDetails')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.brand')}:</span>
                    <span>{selectedCar.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.model')}:</span>
                    <span>{selectedCar.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.year')}:</span>
                    <span>{selectedCar.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.color')}:</span>
                    <span>{selectedCar.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.transmission')}:</span>
                    <span>{selectedCar.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.seats')}:</span>
                    <span>{selectedCar.seats}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{t('modal.ownerInfo')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.name')}:</span>
                    <span>{selectedCar.owner.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.email')}:</span>
                    <span>{selectedCar.owner.email}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold mt-4 mb-2">{t('modal.statistics')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.totalBookings')}:</span>
                    <span>{selectedCar.totalBookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.totalRevenue')}:</span>
                    <span>${selectedCar.totalRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">{t('modal.rating')}:</span>
                    <span>{selectedCar.rating} ⭐</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <select
                value={selectedCar.status}
                onChange={(e) => {
                  handleStatusChange(selectedCar.id, e.target.value);
                  setSelectedCar({ ...selectedCar, status: e.target.value });
                }}
                className="flex-1 px-3 py-2 border border-[#E4E4E7] rounded-lg"
              >
                <option value="available">{t('status.available')}</option>
                <option value="booked">{t('status.booked')}</option>
                <option value="maintenance">{t('status.maintenance')}</option>
              </select>
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                {t('modal.close')}
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        {selectedCar && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">{t('modal.deleteTitle')}</h2>
            <p className="text-[#52525B] mb-6">
              {t('modal.deleteMessage', { name: selectedCar.name })}
            </p>
            <div className="flex gap-3">
              <Button variant="danger" onClick={handleDeleteCar} className="flex-1">
                {t('modal.yesDelete')}
              </Button>
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)} className="flex-1">
                {t('modal.cancel')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarListingsPage;
