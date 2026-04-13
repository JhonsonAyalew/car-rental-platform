import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Package,
  Wrench,
  X,
} from 'lucide-react';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { useTranslation } from 'react-i18next';

const SearchPage = () => {
  const { t } = useTranslation(['common', 'search1']);
  const location = useLocation();

  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000000],
    type: '',
    attachment: '',
    sortBy: 'recommended'
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    setLoading(true);
    setTimeout(() => {
      const mockEquipment = [
        {
          id: 1,
          name: 'CAT 320 Excavator',
          brand: 'Caterpillar',
          price: 8500,
          hourlyRate: 1200,
          rating: 4.9,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          location: 'Addis Ababa, Ethiopia',
          type: 'Excavator',
          attachment: 'Shovel',
          weight: '20 tons',
          featured: true,
        },
        {
          id: 2,
          name: 'SANY SY335 Excavator',
          brand: 'SANY',
          price: 7800,
          hourlyRate: 1100,
          rating: 4.8,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_ud0B5zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10',
          location: 'Dire Dawa, Ethiopia',
          type: 'Excavator',
          attachment: 'Hammer',
          weight: '33 tons',
          featured: true,
        },
        {
          id: 3,
          name: 'CAT 950 Wheel Loader',
          brand: 'Caterpillar',
          price: 7200,
          hourlyRate: 1000,
          rating: 4.9,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
          location: 'Hawassa, Ethiopia',
          type: 'Loader',
          attachment: 'Bucket',
          weight: '25 tons',
          featured: true,
        },
        {
          id: 4,
          name: 'CAT 430 Backhoe Loader',
          brand: 'Caterpillar',
          price: 5500,
          hourlyRate: 800,
          rating: 4.7,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFwNhYDEf8xKGGY6s92m03WMHpeFLneV6V2EbC9m9BQ&s',
          location: 'Mekelle, Ethiopia',
          type: 'Backhoe Loader',
          attachment: 'Bucket + Backhoe',
          weight: '9 tons',
          featured: false,
        },
        {
          id: 5,
          name: 'Komatsu D65 Bulldozer',
          brand: 'Komatsu',
          price: 9000,
          hourlyRate: 1300,
          rating: 4.8,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10',
          location: 'Adama, Ethiopia',
          type: 'Bulldozer',
          attachment: 'Blade',
          weight: '22 tons',
          featured: true,
        },
        {
          id: 6,
          name: 'CAT 140M Motor Grader',
          brand: 'Caterpillar',
          price: 8000,
          hourlyRate: 1150,
          rating: 4.8,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6U-WSl2JQr17KXXFcrdCV_WDoiCgiN1tmcJT5BKCDSQ&s=10',
          location: 'Bahir Dar, Ethiopia',
          type: 'Grader',
          attachment: 'Blade',
          weight: '15 tons',
          featured: false,
        },
        {
          id: 7,
          name: 'CAT M318 Wheeled Excavator',
          brand: 'Caterpillar',
          price: 7500,
          hourlyRate: 1050,
          rating: 4.7,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdJxQmKgfAP_M6dGQxKF6GD57KKUcw-eqHw8X700TVzQ&s=10',
          location: 'Addis Ababa, Ethiopia',
          type: 'Wheeled Excavator',
          attachment: 'Shovel',
          weight: '18 tons',
          featured: false,
        },
        {
          id: 8,
          name: 'Liebherr LTM 1050 Crane',
          brand: 'Liebherr',
          price: 18000,
          hourlyRate: 2500,
          rating: 4.9,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10',
          location: 'Addis Ababa, Ethiopia',
          type: 'Crane',
          attachment: 'Hook',
          weight: '50 tons',
          featured: true,
        },
        {
          id: 9,
          name: 'Water Bowser Automatic',
          brand: 'HOWO',
          price: 4500,
          hourlyRate: 650,
          rating: 4.6,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcResbZoJc6aBKb_MqMX-OgTNpmok3LjV3HhfE7eE3D9gA&s',
          location: 'Dire Dawa, Ethiopia',
          type: 'Water Truck',
          attachment: 'Automatic Sprinkler',
          weight: '20 tons',
          featured: false,
        },
        {
          id: 10,
          name: 'Water Bowser Manual',
          brand: 'HOWO',
          price: 3800,
          hourlyRate: 550,
          rating: 4.5,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlLeUA0Va6oTjZX28tH3KJkd0AF27Bl7fb2DvBazhYQ&s',
          location: 'Hawassa, Ethiopia',
          type: 'Water Truck',
          attachment: 'Manual Sprinkler',
          weight: '18 tons',
          featured: false,
        },
        {
          id: 11,
          name: 'Rollo Cargo Roller',
          brand: 'XCMG',
          price: 5000,
          hourlyRate: 700,
          rating: 4.6,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFu8-hzQMbEjG_fOU9tTUeyNJnINs4ZAN3VFH2RFJuQA&s=10',
          location: 'Adama, Ethiopia',
          type: 'Road Roller',
          attachment: 'Drum',
          weight: '12 tons',
          featured: false,
        },
        {
          id: 12,
          name: 'Sinotruk HOWO 371',
          brand: 'Sinotruk',
          price: 4800,
          hourlyRate: 680,
          rating: 4.6,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10',
          location: 'Addis Ababa, Ethiopia',
          type: 'Dump Truck',
          attachment: 'Tipper',
          weight: '25 tons',
          featured: true,
        },
        {
          id: 13,
          name: 'Loaded Cargo Truck',
          brand: 'Sinotruk',
          price: 4200,
          hourlyRate: 600,
          rating: 4.5,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREBHA9B5KfrfUF10ddu4VyQg9_BJ7PyXQXoJiNCy8yA&s=10',
          location: 'Mekelle, Ethiopia',
          type: 'Cargo Truck',
          attachment: 'Flatbed',
          weight: '30 tons',
          featured: false,
        },
        {
          id: 14,
          name: 'Casoni Compactor',
          brand: 'Casoni',
          price: 3500,
          hourlyRate: 500,
          rating: 4.5,
          image: 'https://www.sonsraymachinery.com/wp-content/uploads/2025/03/Case-Compaction_Transparent-2.png',
          location: 'Bahir Dar, Ethiopia',
          type: 'Compactor',
          attachment: 'Compactor Drum',
          weight: '10 tons',
          featured: false,
        },
        {
          id: 15,
          name: 'Pickup 4x4',
          brand: 'Toyota',
          price: 1800,
          hourlyRate: 250,
          rating: 4.7,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_o4ak7EsO8B8Lhd-3z0DJdEsnosMy9gisB73C_ejqg&s=10',
          location: 'Addis Ababa, Ethiopia',
          type: 'Pickup',
          attachment: 'None',
          weight: '2 tons',
          featured: false,
        },
        {
          id: 16,
          name: 'Teter 01 Transport',
          brand: 'Teter',
          price: 3200,
          hourlyRate: 450,
          rating: 4.4,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flatbed_truck.jpg/640px-Flatbed_truck.jpg',
          location: 'Dire Dawa, Ethiopia',
          type: 'Transport Truck',
          attachment: 'Flatbed',
          weight: '15 tons',
          featured: false,
        },
        {
          id: 17,
          name: 'Teter 02 Transport',
          brand: 'Teter',
          price: 3400,
          hourlyRate: 480,
          rating: 4.4,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flatbed_truck.jpg/640px-Flatbed_truck.jpg',
          location: 'Adama, Ethiopia',
          type: 'Transport Truck',
          attachment: 'Flatbed',
          weight: '18 tons',
          featured: false,
        },
        {
          id: 18,
          name: 'Gypsum Truck',
          brand: 'HOWO',
          price: 3000,
          hourlyRate: 420,
          rating: 4.3,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-nBj5cFzsjbChdZnXDdyV-UmoSfl1Cdk4pmiLWor2Kg&s=10',
          location: 'Hawassa, Ethiopia',
          type: 'Material Truck',
          attachment: 'Bulk Tank',
          weight: '20 tons',
          featured: false,
        },
        {
          id: 19,
          name: 'Terazone Machine',
          brand: 'XCMG',
          price: 4000,
          hourlyRate: 580,
          rating: 4.5,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Road_roller_compactor.jpg/640px-Road_roller_compactor.jpg',
          location: 'Addis Ababa, Ethiopia',
          type: 'Compactor',
          attachment: 'Plate Compactor',
          weight: '8 tons',
          featured: false,
        },
        {
          id: 20,
          name: 'Antenna Crane 8T',
          brand: 'XCMG',
          price: 6500,
          hourlyRate: 950,
          rating: 4.6,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Liebherr_LTM_1050-3.1.jpg/640px-Liebherr_LTM_1050-3.1.jpg',
          location: 'Addis Ababa, Ethiopia',
          type: 'Crane',
          attachment: 'Hook',
          weight: '8 tons',
          featured: false,
        },
        {
          id: 21,
          name: 'Antenna Crane 10T',
          brand: 'XCMG',
          price: 7500,
          hourlyRate: 1100,
          rating: 4.7,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Liebherr_LTM_1050-3.1.jpg/640px-Liebherr_LTM_1050-3.1.jpg',
          location: 'Mekelle, Ethiopia',
          type: 'Crane',
          attachment: 'Hook',
          weight: '10 tons',
          featured: false,
        },
      ];
      setEquipment(mockEquipment);
      setFilteredEquipment(mockEquipment);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...equipment];

    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }
    if (filters.attachment) {
      filtered = filtered.filter(item => item.attachment === filters.attachment);
    }
    filtered = filtered.filter(item => 
      item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );

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

    setFilteredEquipment(filtered);
  }, [filters, equipment]);

  // Get unique values for filters
  const equipmentTypes = [...new Set(equipment.map(item => item.type))];
  const attachments = [...new Set(equipment.map(item => item.attachment))];

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
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
            {t('pageTitle', { ns: 'search' })}
          </h1>
          <p className="text-[#52525B]">
            {filteredEquipment.length} {t('pageSubtitle', { ns: 'search' })}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button onClick={() => setShowFilters(!showFilters)} className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            {showFilters 
              ? t('hideFilters', { ns: 'search' }) 
              : t('showFilters', { ns: 'search' })
            }
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                  {t('filtersTitle', { ns: 'search' })}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFilters({
                    priceRange: [0, 1000000000],
                    type: '',
                    attachment: '',
                    sortBy: 'recommended'
                  })}
                >
                  {t('resetAll', { ns: 'search' })}
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {t('dailyRate', { ns: 'search' })}
                </label>
                <div className="flex gap-2 items-center">
                  <span className="text-sm">ETB {filters.priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm">ETB {filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Equipment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {t('equipmentType', { ns: 'search' })}
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                >
                  <option value="">{t('allTypes', { ns: 'search' })}</option>
                  {equipmentTypes.map(type => (
                    <option key={type} value={type}>
                      {t(`equipmentTypes.${type.toLowerCase().replace(/\s+/g, '')}`, { ns: 'search' }) || type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Attachment */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {t('attachment', { ns: 'search' })}
                </label>
                <select
                  value={filters.attachment}
                  onChange={(e) => setFilters({ ...filters, attachment: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                >
                  <option value="">{t('allAttachments', { ns: 'search' })}</option>
                  {attachments.map(attachment => (
                    <option key={attachment} value={attachment}>
                      {t(`attachments.${attachment.toLowerCase().replace(/\s+/g, '').replace(/\+/g, 'Plus')}`, { ns: 'search' }) || attachment}
                    </option>
                  ))}
                </select>
              </div>
            </Card>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <Card className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#52525B]">
                  {t('showingResults', { ns: 'search' })} {filteredEquipment.length} {t('results', { ns: 'search' })}
                </p>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="px-3 py-1 border border-[#E4E4E7] rounded-lg bg-white text-sm"
                >
                  <option value="recommended">{t('sortRecommended', { ns: 'search' })}</option>
                  <option value="price-low">{t('sortPriceLow', { ns: 'search' })}</option>
                  <option value="price-high">{t('sortPriceHigh', { ns: 'search' })}</option>
                  <option value="rating">{t('sortRating', { ns: 'search' })}</option>
                </select>
              </div>
            </Card>

            {/* Equipment Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEquipment.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-medium transition-all group">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/128x128?text=No+Image';
                          }}
                        />
                      </div>
                     
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-[#52525B]">{item.brand} • {item.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#D97706]">ETB {item.price}</p>
                            <p className="text-xs text-[#A1A1AA]">
                              {t('perDay', { ns: 'search' })}
                            </p>
                            <p className="text-xs text-[#10B981]">
                              {t('or', { ns: 'search' })} ETB {item.hourlyRate}/{t('perHour', { ns: 'search' })}
                            </p>
                          </div>
                        </div>
                       
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#52525B] mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">{item.location.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs">{item.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            <span className="text-xs">{item.weight}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wrench className="w-3 h-3" />
                            <span className="text-xs">{item.attachment}</span>
                          </div>
                        </div>
                       
                        <div className="flex gap-2 mt-3">
                          <Link to={`/equipment/${item.id}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              {t('viewDetails', { ns: 'search' })}
                            </Button>
                          </Link>
                          <Link to={`/customer/booking/new/${item.id}`} className="flex-1">
                            <Button size="sm" variant="secondary" className="w-full">
                              {t('bookNow', { ns: 'search' })}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEquipment.length === 0 && (
              <Card className="text-center py-12">
                <Package className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {t('noEquipmentFound', { ns: 'search' })}
                </h3>
                <p className="text-[#52525B]">
                  {t('adjustFilters', { ns: 'search' })}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
