import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Sliders,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Car,
  Fuel,
  Users,
  Settings,
  X,
  ChevronDown
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const SearchPage = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    brand: '',
    transmission: '',
    seats: '',
    fuelType: '',
    sortBy: 'recommended'
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    setLoading(true);
    setTimeout(() => {
      const mockCars = [
        {
          id: 1,
          name: 'Tesla Model 3',
          brand: 'Tesla',
          year: 2023,
          price: 120,
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
          location: 'Los Angeles, CA',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Electric',
          available: true,
          owner: { name: 'Sarah Johnson', rating: 4.8 }
        },
        {
          id: 2,
          name: 'BMW X5',
          brand: 'BMW',
          year: 2023,
          price: 150,
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          location: 'New York, NY',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Petrol',
          available: true,
          owner: { name: 'Mike Brown', rating: 4.9 }
        },
        {
          id: 3,
          name: 'Mercedes C-Class',
          brand: 'Mercedes',
          year: 2022,
          price: 110,
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
          location: 'Miami, FL',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Petrol',
          available: true,
          owner: { name: 'David Wilson', rating: 5.0 }
        },
        {
          id: 4,
          name: 'Toyota Camry',
          brand: 'Toyota',
          year: 2022,
          price: 65,
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
          location: 'Chicago, IL',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Hybrid',
          available: true,
          owner: { name: 'John Smith', rating: 4.7 }
        },
        {
          id: 5,
          name: 'Honda CR-V',
          brand: 'Honda',
          year: 2022,
          price: 75,
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
          location: 'Seattle, WA',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Petrol',
          available: true,
          owner: { name: 'Emily Davis', rating: 4.6 }
        },
        {
          id: 6,
          name: 'Audi Q5',
          brand: 'Audi',
          year: 2023,
          price: 130,
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
          location: 'San Francisco, CA',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Petrol',
          available: false,
          owner: { name: 'Lisa Anderson', rating: 4.9 }
        }
      ];
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...cars];
    
    if (filters.brand) {
      filtered = filtered.filter(c => c.brand === filters.brand);
    }
    if (filters.transmission) {
      filtered = filtered.filter(c => c.transmission === filters.transmission);
    }
    if (filters.seats) {
      filtered = filtered.filter(c => c.seats >= parseInt(filters.seats));
    }
    if (filters.fuelType) {
      filtered = filtered.filter(c => c.fuelType === filters.fuelType);
    }
    filtered = filtered.filter(c => c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1]);
    
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredCars(filtered);
  }, [filters, cars]);

  const brands = [...new Set(cars.map(c => c.brand))];
  const transmissions = [...new Set(cars.map(c => c.transmission))];
  const fuelTypes = [...new Set(cars.map(c => c.fuelType))];

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Find Your Perfect Car</h1>
          <p className="text-[#52525B]">{filteredCars.length} cars available</p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button onClick={() => setShowFilters(!showFilters)} className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setFilters({
                  priceRange: [0, 200],
                  brand: '',
                  transmission: '',
                  seats: '',
                  fuelType: '',
                  sortBy: 'recommended'
                })}>
                  Reset All
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range (per day)</label>
                <div className="flex gap-2 items-center">
                  <span className="text-sm">${filters.priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                    className="flex-1"
                  />
                  <span className="text-sm">${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Transmission</label>
                <div className="space-y-2">
                  {transmissions.map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="transmission"
                        value={type}
                        checked={filters.transmission === type}
                        onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                        className="text-[#D97706]"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seats */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Minimum Seats</label>
                <select
                  value={filters.seats}
                  onChange={(e) => setFilters({ ...filters, seats: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                >
                  <option value="">Any</option>
                  <option value="4">4+ seats</option>
                  <option value="5">5+ seats</option>
                  <option value="6">6+ seats</option>
                  <option value="7">7+ seats</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Fuel Type</label>
                <div className="space-y-2">
                  {fuelTypes.map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fuelType"
                        value={type}
                        checked={filters.fuelType === type}
                        onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                        className="text-[#D97706]"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <Card className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#52525B]">Showing {filteredCars.length} results</p>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="px-3 py-1 border border-[#E4E4E7] rounded-lg bg-white text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </Card>

            {/* Car Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-medium transition-all group">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 rounded-lg overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{car.name}</h3>
                            <p className="text-sm text-[#52525B]">{car.brand} {car.year}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#D97706]">${car.price}</p>
                            <p className="text-xs text-[#A1A1AA]">per day</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-[#52525B] mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">{car.location.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs">{car.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span className="text-xs">{car.seats} seats</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Link to={`/car/${car.id}`} className="flex-1">
                            <Button size="sm" className="w-full">View Details</Button>
                          </Link>
                          {car.available && (
                            <Link to={`/customer/booking/new/${car.id}`} className="flex-1">
                              <Button size="sm" variant="secondary" className="w-full">Book Now</Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <Card className="text-center py-12">
                <Car className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No cars found</h3>
                <p className="text-[#52525B]">Try adjusting your filters</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
