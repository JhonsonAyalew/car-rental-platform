import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Timer,
  HardHat,
  Truck,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Save,
  X,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const TimeControllerPage = () => {
  const { t } = useTranslation('timeController');
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({});
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  const [slotForm, setSlotForm] = useState({
    startTime: '08:00',
    endTime: '12:00',
    status: 'available',
    customerName: '',
    notes: ''
  });

  // Mock equipment data
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    setLoading(true);
    setTimeout(() => {
      const mockEquipment = [
        { id: 'EQ-001', name: 'CAT 320 Excavator', type: 'Excavator', hourlyRate: 65, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100', status: 'available' },
        { id: 'EQ-002', name: 'Komatsu WA500 Loader', type: 'Loader', hourlyRate: 50, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100', status: 'available' },
        { id: 'EQ-003', name: 'Sinotruck Dump Truck', type: 'Truck', hourlyRate: 40, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=100', status: 'busy' },
        { id: 'EQ-004', name: 'Bulldozer D6R', type: 'Bulldozer', hourlyRate: 75, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100', status: 'available' },
        { id: 'EQ-005', name: '50T Mobile Crane', type: 'Crane', hourlyRate: 120, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100', status: 'maintenance' }
      ];
      setEquipmentList(mockEquipment);
      setSelectedEquipment(mockEquipment[0]);
      generateMockTimeSlots();
      setLoading(false);
    }, 800);
  };

  const generateMockTimeSlots = () => {
    const mockSlots = {};
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      
      // Generate multiple time slots per day
      mockSlots[dateKey] = [
        {
          id: `${dateKey}-1`,
          startTime: '08:00',
          endTime: '12:00',
          status: i === 0 ? 'booked' : 'available',
          customerName: i === 0 ? 'ABC Construction' : '',
          notes: i === 0 ? 'Site preparation' : ''
        },
        {
          id: `${dateKey}-2`,
          startTime: '13:00',
          endTime: '17:00',
          status: i === 1 ? 'booked' : 'available',
          customerName: i === 1 ? 'XYZ Builders' : '',
          notes: i === 1 ? 'Foundation work' : ''
        },
        {
          id: `${dateKey}-3`,
          startTime: '18:00',
          endTime: '22:00',
          status: i === 2 ? 'maintenance' : 'available',
          customerName: '',
          notes: i === 2 ? 'Night maintenance' : ''
        }
      ];
    }
    setTimeSlots(mockSlots);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleAddTimeSlot = (dateKey) => {
    setEditingSlot({ dateKey, slot: null });
    setSlotForm({
      startTime: '08:00',
      endTime: '12:00',
      status: 'available',
      customerName: '',
      notes: ''
    });
    setShowAddSlotModal(true);
  };

  const handleEditSlot = (dateKey, slot) => {
    setEditingSlot({ dateKey, slot });
    setSlotForm({
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: slot.status,
      customerName: slot.customerName || '',
      notes: slot.notes || ''
    });
    setShowAddSlotModal(true);
  };

  const handleDeleteSlot = (dateKey, slotId) => {
    setTimeSlots(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(slot => slot.id !== slotId)
    }));
    toast.success(t('messages.slotDeleted'));
  };

  const saveTimeSlot = () => {
    if (!editingSlot) return;
    
    const { dateKey, slot } = editingSlot;
    const newSlot = {
      id: slot ? slot.id : `${dateKey}-${Date.now()}`,
      startTime: slotForm.startTime,
      endTime: slotForm.endTime,
      status: slotForm.status,
      customerName: slotForm.customerName,
      notes: slotForm.notes
    };
    
    if (slot) {
      // Update existing slot
      setTimeSlots(prev => ({
        ...prev,
        [dateKey]: prev[dateKey].map(s => s.id === slot.id ? newSlot : s)
      }));
      toast.success(t('messages.slotUpdated'));
    } else {
      // Add new slot
      setTimeSlots(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newSlot].sort((a, b) => a.startTime.localeCompare(b.startTime))
      }));
      toast.success(t('messages.slotAdded'));
    }
    
    setShowAddSlotModal(false);
    setEditingSlot(null);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'available': return <Badge variant="approved">✓ {t('status.available')}</Badge>;
      case 'booked': return <Badge variant="pending">📅 {t('status.booked')}</Badge>;
      case 'maintenance': return <Badge variant="rejected">🔧 {t('status.maintenance')}</Badge>;
      default: return <Badge variant="pending">{status}</Badge>;
    }
  };

  const weekDays = getWeekDays();
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <div className="p-2 bg-[#D97706]/10 rounded-xl">
              <Timer className="w-6 h-6 text-[#D97706]" />
            </div>
            {t('page.title')}
          </h1>
          <p className="text-[#52525B] mt-1">{t('page.subtitle')}</p>
        </div>
      </div>

      {/* Equipment Selector */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-[#52525B]">{t('equipmentSelector.label')}</label>
            <select
              value={selectedEquipment?.id || ''}
              onChange={(e) => {
                const equipment = equipmentList.find(eq => eq.id === e.target.value);
                setSelectedEquipment(equipment);
              }}
              className="w-full px-4 py-2.5 border border-[#E4E4E7] rounded-xl bg-white focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition"
            >
              {equipmentList.map(equipment => (
                <option key={equipment.id} value={equipment.id}>
                  {equipment.name} - ${equipment.hourlyRate}/{t('equipmentInfo.hourlyRate')}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end gap-2">
            <Button variant="ghost" onClick={handlePrevWeek} iconLeft={<ChevronLeft className="w-4 h-4" />}>
              {t('weekNavigation.prevWeek')}
            </Button>
            <Button variant="ghost" onClick={handleNextWeek} iconRight={<ChevronRight className="w-4 h-4" />}>
              {t('weekNavigation.nextWeek')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Equipment Info */}
      {selectedEquipment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#D97706] to-[#B45309] rounded-2xl p-5 text-white"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <HardHat className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedEquipment.name}</h2>
                <div className="flex gap-4 mt-1 text-sm text-white/80">
                  <span>💰 ${selectedEquipment.hourlyRate}/{t('equipmentInfo.hourlyRate')}</span>
                  <span>🔧 {selectedEquipment.type}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Weekly Schedule - Multiple slots per day */}
      <div className="space-y-4">
        {weekDays.map((day, dayIndex) => {
          const dateKey = day.toISOString().split('T')[0];
          const daySlots = timeSlots[dateKey] || [];
          const isToday = new Date().toDateString() === day.toDateString();
          const isExpanded = expandedDay === dateKey;
          
          return (
            <Card key={dayIndex} className={`overflow-hidden ${isToday ? 'border-2 border-[#D97706]' : ''}`}>
              {/* Day Header */}
              <div 
                className={`flex flex-wrap justify-between items-center p-4 cursor-pointer transition ${isExpanded ? 'bg-[#FEF3C7]' : 'hover:bg-[#F9F8F6]'}`}
                onClick={() => setExpandedDay(isExpanded ? null : dateKey)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[100px]">
                    <div className="font-bold text-lg text-[#1A1A1A]">{dayNames[dayIndex]}</div>
                    <div className="text-sm text-[#A1A1AA]">{day.toLocaleDateString()}</div>
                    {isToday && <span className="text-[10px] text-[#D97706] font-medium">{t('dayHeader.today')}</span>}
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="info">{daySlots.length} {t('dayHeader.slots')}</Badge>
                    <Badge variant="approved">{daySlots.filter(s => s.status === 'available').length} {t('dayHeader.available')}</Badge>
                    <Badge variant="pending">{daySlots.filter(s => s.status === 'booked').length} {t('dayHeader.booked')}</Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    iconLeft={<Plus className="w-4 h-4" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddTimeSlot(dateKey);
                    }}
                  >
                    {t('timeSlots.addSlot')}
                  </Button>
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
              
              {/* Time Slots List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#E4E4E7]"
                  >
                    {daySlots.length === 0 ? (
                      <div className="text-center py-8 text-[#A1A1AA]">
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>{t('timeSlots.noSlots')}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleAddTimeSlot(dateKey)}
                        >
                          {t('timeSlots.addFirstSlot')}
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y divide-[#E4E4E7]">
                        {daySlots.map((slot, slotIndex) => (
                          <div key={slot.id} className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-[#F9F8F6] transition">
                            <div className="flex items-center gap-4">
                              <div className="w-32 text-center">
                                <div className="font-medium text-[#1A1A1A]">{slot.startTime}</div>
                                <div className="text-xs text-[#A1A1AA]">{t('timeSlots.to')}</div>
                                <div className="font-medium text-[#1A1A1A]">{slot.endTime}</div>
                              </div>
                              
                              <div className="flex flex-col gap-1">
                                {getStatusBadge(slot.status)}
                                {slot.customerName && (
                                  <span className="text-xs text-[#52525B]">👤 {slot.customerName}</span>
                                )}
                                {slot.notes && (
                                  <span className="text-xs text-[#A1A1AA]">📝 {slot.notes}</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                iconLeft={<Edit className="w-4 h-4" />}
                                onClick={() => handleEditSlot(dateKey, slot)}
                              >
                                {t('timeSlots.edit')}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-red-600"
                                iconLeft={<Trash2 className="w-4 h-4" />}
                                onClick={() => handleDeleteSlot(dateKey, slot.id)}
                              >
                                {t('timeSlots.delete')}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-[#D97706]">
            {Object.values(timeSlots).reduce((sum, slots) => sum + slots.length, 0)}
          </div>
          <p className="text-xs text-[#52525B]">{t('stats.totalSlots')}</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">
            {Object.values(timeSlots).reduce((sum, slots) => sum + slots.filter(s => s.status === 'available').length, 0)}
          </div>
          <p className="text-xs text-[#52525B]">{t('stats.availableSlots')}</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {Object.values(timeSlots).reduce((sum, slots) => sum + slots.filter(s => s.status === 'booked').length, 0)}
          </div>
          <p className="text-xs text-[#52525B]">{t('stats.bookedSlots')}</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-red-600">
            {Object.values(timeSlots).reduce((sum, slots) => sum + slots.filter(s => s.status === 'maintenance').length, 0)}
          </div>
          <p className="text-xs text-[#52525B]">{t('stats.maintenanceSlots')}</p>
        </Card>
      </div>

      {/* Add/Edit Time Slot Modal */}
      {showAddSlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-strong"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingSlot?.slot ? t('modal.editTitle') : t('modal.addTitle')}</h2>
                <button onClick={() => setShowAddSlotModal(false)} className="p-1 hover:bg-[#F3F2EE] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('modal.startTime')}</label>
                    <input
                      type="time"
                      value={slotForm.startTime}
                      onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                      className="w-full px-4 py-2.5 border border-[#E4E4E7] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('modal.endTime')}</label>
                    <input
                      type="time"
                      value={slotForm.endTime}
                      onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                      className="w-full px-4 py-2.5 border border-[#E4E4E7] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('modal.status')}</label>
                  <select
                    value={slotForm.status}
                    onChange={(e) => setSlotForm({ ...slotForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#E4E4E7] rounded-xl focus:outline-none focus:border-[#D97706]"
                  >
                    <option value="available">✓ {t('status.available')}</option>
                    <option value="booked">📅 {t('status.booked')}</option>
                    <option value="maintenance">🔧 {t('status.maintenance')}</option>
                  </select>
                </div>
                
                {slotForm.status === 'booked' && (
                  <Input
                    label={t('modal.customerName')}
                    placeholder={t('modal.customerPlaceholder')}
                    value={slotForm.customerName}
                    onChange={(e) => setSlotForm({ ...slotForm, customerName: e.target.value })}
                  />
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('modal.notes')}</label>
                  <textarea
                    rows="2"
                    value={slotForm.notes}
                    onChange={(e) => setSlotForm({ ...slotForm, notes: e.target.value })}
                    placeholder={t('modal.notesPlaceholder')}
                    className="w-full px-4 py-2.5 border border-[#E4E4E7] rounded-xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button onClick={saveTimeSlot} className="flex-1">
                    {editingSlot?.slot ? t('modal.updateButton') : t('modal.addButton')}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowAddSlotModal(false)} className="flex-1">
                    {t('modal.cancel')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TimeControllerPage;
