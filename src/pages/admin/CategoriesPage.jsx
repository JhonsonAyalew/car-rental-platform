import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  HardHat,
  Truck,
  Factory,
  Drill,
  Gauge,
  Fuel,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle,
  Settings,
  Tag,
  Clock,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const CategoriesPage = () => {
  const { t } = useTranslation('categories');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'HardHat',
    description: '',
    basePrice: '',
    hourlyRate: '',
    deposit: '',
    features: []
  });

  // Icon options
  const iconOptions = [
    { name: 'HardHat', icon: HardHat },
    { name: 'Truck', icon: Truck },
    { name: 'Factory', icon: Factory },
    { name: 'Drill', icon: Drill },
    { name: 'Gauge', icon: Gauge },
    { name: 'Fuel', icon: Fuel }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setTimeout(() => {
      const mockCategories = [
        {
          id: 1,
          name: 'Excavators',
          icon: 'HardHat',
          description: 'Hydraulic excavators for digging and earthmoving',
          equipmentCount: 45,
          activeBookings: 12,
          totalRevenue: 385000,
          basePrice: 7500,
          hourlyRate: 1100,
          deposit: 15000,
          features: ['Bucket', 'Hammer', 'Auger', 'Thumb'],
          color: '#D97706'
        },
        {
          id: 2,
          name: 'Loaders',
          icon: 'Truck',
          description: 'Wheel loaders for material handling',
          equipmentCount: 32,
          activeBookings: 8,
          totalRevenue: 298000,
          basePrice: 6800,
          hourlyRate: 980,
          deposit: 12000,
          features: ['Bucket', 'Forks', 'Snow Plow'],
          color: '#10B981'
        },
        {
          id: 3,
          name: 'Bulldozers',
          icon: 'Factory',
          description: 'Heavy duty dozers for pushing and grading',
          equipmentCount: 18,
          activeBookings: 5,
          totalRevenue: 189000,
          basePrice: 8500,
          hourlyRate: 1250,
          deposit: 18000,
          features: ['Blade', 'Ripper', 'GPS Grade'],
          color: '#3B82F6'
        },
        {
          id: 4,
          name: 'Graders',
          icon: 'Drill',
          description: 'Motor graders for road construction',
          equipmentCount: 12,
          activeBookings: 3,
          totalRevenue: 125000,
          basePrice: 7500,
          hourlyRate: 1100,
          deposit: 14000,
          features: ['Blade', 'Scarifier', 'GPS'],
          color: '#F59E0B'
        },
        {
          id: 5,
          name: 'Cranes',
          icon: 'Gauge',
          description: 'Mobile cranes for heavy lifting',
          equipmentCount: 12,
          activeBookings: 4,
          totalRevenue: 320000,
          basePrice: 16500,
          hourlyRate: 2400,
          deposit: 35000,
          features: ['Hook', 'Jib', 'Load Cell'],
          color: '#8B5CF6'
        },
        {
          id: 6,
          name: 'Dump Trucks',
          icon: 'Truck',
          description: 'Heavy duty trucks for material transport',
          equipmentCount: 89,
          activeBookings: 28,
          totalRevenue: 425000,
          basePrice: 4500,
          hourlyRate: 650,
          deposit: 8000,
          features: ['Tipper', 'Cover', 'Tailgate'],
          color: '#06B6D4'
        },
        {
          id: 7,
          name: 'Water Trucks',
          icon: 'Fuel',
          description: 'Water sprinkler trucks for dust control',
          equipmentCount: 14,
          activeBookings: 4,
          totalRevenue: 62000,
          basePrice: 4000,
          hourlyRate: 580,
          deposit: 7000,
          features: ['Sprinkler', 'Spray Bar', 'Water Cannon'],
          color: '#84CC16'
        }
      ];
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  };

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(i => i.name === iconName);
    if (icon) {
      const IconComponent = icon.icon;
      return <IconComponent className="w-6 h-6" />;
    }
    return <HardHat className="w-6 h-6" />;
  };

  const handleAddCategory = () => {
    if (!formData.name) {
      toast.error(t('toast.nameRequired'));
      return;
    }
    
    const newCategory = {
      id: categories.length + 1,
      name: formData.name,
      icon: formData.icon,
      description: formData.description,
      equipmentCount: 0,
      activeBookings: 0,
      totalRevenue: 0,
      basePrice: parseInt(formData.basePrice) || 0,
      hourlyRate: parseInt(formData.hourlyRate) || 0,
      deposit: parseInt(formData.deposit) || 0,
      features: formData.features,
      color: '#D97706'
    };
    
    setCategories([...categories, newCategory]);
    toast.success(t('toast.addSuccess'));
    setShowAddModal(false);
    setFormData({ name: '', icon: 'HardHat', description: '', basePrice: '', hourlyRate: '', deposit: '', features: [] });
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map(cat =>
      cat.id === selectedCategory.id
        ? { ...cat, ...formData, basePrice: parseInt(formData.basePrice) || cat.basePrice, hourlyRate: parseInt(formData.hourlyRate) || cat.hourlyRate, deposit: parseInt(formData.deposit) || cat.deposit }
        : cat
    );
    setCategories(updatedCategories);
    toast.success(t('toast.updateSuccess'));
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (category) => {
    if (category.equipmentCount > 0) {
      toast.error(t('toast.deleteError', { name: category.name, count: category.equipmentCount }));
      return;
    }
    setCategories(categories.filter(c => c.id !== category.id));
    toast.success(t('toast.deleteSuccess'));
  };

  const totalStats = {
    totalEquipment: categories.reduce((sum, cat) => sum + cat.equipmentCount, 0),
    totalRevenue: categories.reduce((sum, cat) => sum + cat.totalRevenue, 0),
    totalBookings: categories.reduce((sum, cat) => sum + cat.activeBookings, 0)
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
        
        <Button onClick={() => setShowAddModal(true)} iconLeft={<Plus className="w-4 h-4" />}>
          {t('page.addButton')}
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="text-center bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7]/30">
          <HardHat className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#1A1A1A]">{totalStats.totalEquipment}</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalEquipment')}</p>
        </Card>
        <Card className="text-center bg-gradient-to-r from-[#10B981]/10 to-[#DCFCE7]/30">
          <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#1A1A1A]">{totalStats.totalBookings}</p>
          <p className="text-sm text-[#52525B]">{t('stats.activeBookings')}</p>
        </Card>
        <Card className="text-center bg-gradient-to-r from-[#8B5CF6]/10 to-[#EDE9FE]/30">
          <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#1A1A1A]">ETB {(totalStats.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#52525B]">{t('stats.totalRevenue')}</p>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div 
                className="h-2"
                style={{ backgroundColor: category.color }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <div style={{ color: category.color }}>
                        {getIconComponent(category.icon)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A]">{category.name}</h3>
                      <p className="text-xs text-[#52525B]">{category.equipmentCount} {t('categoryCard.equipmentCount')}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setFormData({
                          name: category.name,
                          icon: category.icon,
                          description: category.description,
                          basePrice: category.basePrice,
                          hourlyRate: category.hourlyRate,
                          deposit: category.deposit,
                          features: category.features
                        });
                        setShowEditModal(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[#F3F2EE] transition"
                    >
                      <Edit className="w-4 h-4 text-[#52525B]" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-[#52525B] mb-4">{category.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#52525B]">{t('categoryCard.dailyRate')}</span>
                    <span className="font-medium text-[#D97706]">ETB {category.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#52525B]">{t('categoryCard.hourlyRate')}</span>
                    <span className="font-medium">ETB {category.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#52525B]">{t('categoryCard.securityDeposit')}</span>
                    <span className="font-medium">ETB {category.deposit.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {category.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {category.features.length > 3 && (
                    <span className="text-xs bg-[#F3F2EE] text-[#52525B] px-2 py-0.5 rounded-full">
                      +{category.features.length - 3} {t('categoryCard.more')}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E7]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-[#A1A1AA]" />
                    <span className="text-xs text-[#52525B]">{category.activeBookings} {t('categoryCard.activeBookings')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-[#A1A1AA]" />
                    <span className="text-xs text-green-600">ETB {category.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">{t('modal.add.title')}</h2>
            <div className="space-y-4">
              <Input
                label={t('modal.add.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('modal.add.namePlaceholder')}
              />
              
              <div>
                <label className="block text-sm font-medium mb-2">{t('modal.add.icon')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon.name}
                      onClick={() => setFormData({ ...formData, icon: icon.name })}
                      className={`p-2 rounded-lg border-2 transition ${
                        formData.icon === icon.name
                          ? 'border-[#D97706] bg-[#FEF3C7] text-[#D97706]'
                          : 'border-[#E4E4E7] text-[#52525B] hover:border-[#D97706]'
                      }`}
                    >
                      <icon.icon className="w-5 h-5 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>
              
              <Input
                label={t('modal.add.description')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('modal.add.descriptionPlaceholder')}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label={t('modal.add.baseRate')}
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  placeholder={t('modal.add.baseRatePlaceholder')}
                />
                <Input
                  label={t('modal.add.hourlyRate')}
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder={t('modal.add.hourlyRatePlaceholder')}
                />
              </div>
              
              <Input
                label={t('modal.add.deposit')}
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                placeholder={t('modal.add.depositPlaceholder')}
              />
              
              <div className="flex gap-3 pt-4">
                <Button onClick={handleAddCategory}>{t('modal.add.submit')}</Button>
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>{t('modal.add.cancel')}</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <Modal onClose={() => setShowEditModal(false)}>
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">{t('modal.edit.title')}</h2>
            <div className="space-y-4">
              <Input
                label={t('modal.add.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              
              <div>
                <label className="block text-sm font-medium mb-2">{t('modal.add.icon')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon.name}
                      onClick={() => setFormData({ ...formData, icon: icon.name })}
                      className={`p-2 rounded-lg border-2 transition ${
                        formData.icon === icon.name
                          ? 'border-[#D97706] bg-[#FEF3C7] text-[#D97706]'
                          : 'border-[#E4E4E7] text-[#52525B] hover:border-[#D97706]'
                      }`}
                    >
                      <icon.icon className="w-5 h-5 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>
              
              <Input
                label={t('modal.add.description')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label={t('modal.add.baseRate')}
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                />
                <Input
                  label={t('modal.add.hourlyRate')}
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                />
              </div>
              
              <Input
                label={t('modal.add.deposit')}
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              />
              
              <div className="flex gap-3 pt-4">
                <Button onClick={handleUpdateCategory}>{t('modal.edit.submit')}</Button>
                <Button variant="ghost" onClick={() => setShowEditModal(false)}>{t('modal.edit.cancel')}</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoriesPage;
