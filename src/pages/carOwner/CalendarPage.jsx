import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Phone,
  DollarSign,
  Truck,
  HardHat,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Filter,
  Download
} from 'lucide-react';

const CalendarPage = () => {
  const { t } = useTranslation('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month');
  const [filterEquipment, setFilterEquipment] = useState('all');
  
  useEffect(() => {
    fetchBookings();
  }, [currentDate]);
  
  const fetchBookings = () => {
    setLoading(true);
    setTimeout(() => {
      const mockBookings = [
        {
          id: 'BK-1001',
          equipmentName: 'CAT 320 Excavator',
          equipmentId: 'EQ-001',
          customerName: 'Tekle Construction',
          customerPhone: '+251 911 234567',
          startDate: '2024-04-15',
          endDate: '2024-04-20',
          startTime: '08:00',
          endTime: '18:00',
          status: 'confirmed',
          totalAmount: 42500,
          type: 'daily',
          location: 'Addis Ababa',
          color: '#D97706'
        },
        {
          id: 'BK-1002',
          equipmentName: 'Sinotruk HOWO 371',
          equipmentId: 'EQ-002',
          customerName: 'Mesfin Engineering',
          customerPhone: '+251 922 345678',
          startDate: '2024-04-16',
          endDate: '2024-04-18',
          startTime: '09:00',
          endTime: '17:00',
          status: 'confirmed',
          totalAmount: 14400,
          type: 'daily',
          location: 'Adama',
          color: '#10B981'
        },
        {
          id: 'BK-1003',
          equipmentName: 'Water Bowser',
          equipmentId: 'EQ-003',
          customerName: 'Hawassa Construction',
          customerPhone: '+251 933 456789',
          startDate: '2024-04-18',
          endDate: '2024-04-22',
          startTime: '08:00',
          endTime: '18:00',
          status: 'pending',
          totalAmount: 15200,
          type: 'daily',
          location: 'Hawassa',
          color: '#F59E0B'
        },
        {
          id: 'BK-1004',
          equipmentName: 'Liebherr LTM 1050 Crane',
          equipmentId: 'EQ-004',
          customerName: 'Dire Dawa Builders',
          customerPhone: '+251 944 567890',
          startDate: '2024-04-20',
          endDate: '2024-04-25',
          startTime: '07:00',
          endTime: '19:00',
          status: 'confirmed',
          totalAmount: 90000,
          type: 'daily',
          location: 'Dire Dawa',
          color: '#3B82F6'
        },
        {
          id: 'BK-1005',
          equipmentName: 'CAT 950 Loader',
          equipmentId: 'EQ-005',
          customerName: 'Gondar Roads PLC',
          customerPhone: '+251 955 678901',
          startDate: '2024-04-17',
          endDate: '2024-04-17',
          startTime: '10:00',
          endTime: '16:00',
          status: 'confirmed',
          totalAmount: 6000,
          type: 'hourly',
          location: 'Gondar',
          color: '#8B5CF6'
        }
      ];
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  };
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };
  
  const getBookingsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    let filtered = bookings.filter(booking => {
      const startDate = booking.startDate;
      const endDate = booking.endDate;
      return dateStr >= startDate && dateStr <= endDate;
    });
    
    if (filterEquipment !== 'all') {
      filtered = filtered.filter(b => b.equipmentId === filterEquipment);
    }
    
    return filtered;
  };
  
  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getStatusBadge = (status) => {
    if (status === 'confirmed') {
      return <Badge variant="approved">✓ {t('status.confirmed')}</Badge>;
    }
    if (status === 'pending') {
      return <Badge variant="pending">⏳ {t('status.pending')}</Badge>;
    }
    return <Badge variant="cancelled">✗ {t('status.cancelled')}</Badge>;
  };
  
  const days = getDaysInMonth(currentDate);
  const monthNames = [
    t('months.january'), t('months.february'), t('months.march'), t('months.april'),
    t('months.may'), t('months.june'), t('months.july'), t('months.august'),
    t('months.september'), t('months.october'), t('months.november'), t('months.december')
  ];
  const weekDays = [
    t('weekDays.sun'), t('weekDays.mon'), t('weekDays.tue'), t('weekDays.wed'),
    t('weekDays.thu'), t('weekDays.fri'), t('weekDays.sat')
  ];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-[#1A1A1A]">{t('title')}</h1>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-[#52525B]">{t('subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white rounded-lg border border-[#E4E4E7] p-1">
              {['month', 'week'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition capitalize ${
                    view === v ? 'bg-[#D97706] text-white' : 'text-[#52525B] hover:bg-[#F3F2EE]'
                  }`}
                >
                  {v === 'month' ? t('month') : t('week')}
                </button>
              ))}
            </div>
            <Button variant="ghost" iconLeft={<Filter className="w-4 h-4" />}>
              {t('filter')}
            </Button>
            <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
              {t('export')}
            </Button>
            <Button iconLeft={<Plus className="w-4 h-4" />}>
              {t('addBooking')}
            </Button>
          </div>
        </div>
        
        {/* Equipment Filter */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-[#52525B]">{t('filterByEquipment')}:</span>
            <select
              value={filterEquipment}
              onChange={(e) => setFilterEquipment(e.target.value)}
              className="px-3 py-1.5 border border-[#E4E4E7] rounded-lg bg-white text-sm"
            >
              <option value="all">{t('allEquipment')}</option>
              <option value="EQ-001">{t('equipment.cat320')}</option>
              <option value="EQ-002">{t('equipment.sinotruk')}</option>
              <option value="EQ-003">{t('equipment.waterBowser')}</option>
              <option value="EQ-004">{t('equipment.crane')}</option>
              <option value="EQ-005">{t('equipment.loader')}</option>
            </select>
          </div>
        </Card>
        
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-white rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5 text-[#52525B]" />
          </button>
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-white rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5 text-[#52525B]" />
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center py-2 text-sm font-medium text-[#52525B]">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, idx) => {
            const dateBookings = date ? getBookingsForDate(date) : [];
            const isToday = date && date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
            
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`
                  min-h-[120px] bg-white rounded-lg p-2 border transition-all cursor-pointer
                  ${isSelected ? 'border-[#D97706] shadow-md' : 'border-[#E4E4E7] hover:border-[#D97706]/50'}
                  ${!date ? 'bg-[#F9F8F6] opacity-50' : ''}
                `}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-[#D97706]' : 'text-[#1A1A1A]'}`}>
                      {date.getDate()}
                      {isToday && <span className="ml-1 text-xs">({t('today')})</span>}
                    </div>
                    <div className="space-y-1">
                      {dateBookings.slice(0, 3).map(booking => (
                        <div
                          key={booking.id}
                          className="text-xs p-1 rounded truncate"
                          style={{ backgroundColor: `${booking.color}20`, color: booking.color }}
                          title={`${booking.equipmentName} - ${booking.customerName}`}
                        >
                          {booking.equipmentName.substring(0, 15)}
                        </div>
                      ))}
                      {dateBookings.length > 3 && (
                        <div className="text-xs text-[#A1A1AA] text-center">
                          +{dateBookings.length - 3} {t('plusMore')}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Selected Date Details */}
        {selectedDate && (
          <Card className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {t('bookingsForDate')} {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDate(null)}>
                {t('close')}
              </Button>
            </div>
            
            <div className="space-y-4">
              {getBookingsForDate(selectedDate).length === 0 ? (
                <div className="text-center py-8 text-[#A1A1AA]">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{t('emptyState.title')}</p>
                  <Button variant="secondary" size="sm" className="mt-2">
                    {t('emptyState.addButton')}
                  </Button>
                </div>
              ) : (
                getBookingsForDate(selectedDate).map(booking => (
                  <div key={booking.id} className="p-4 border border-[#E4E4E7] rounded-lg hover:shadow-md transition">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="font-semibold text-lg">{booking.equipmentName}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#A1A1AA]" />
                            <span>{booking.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#A1A1AA]" />
                            <span>{booking.customerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-[#A1A1AA]" />
                            <span>{booking.startDate} to {booking.endDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#A1A1AA]" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#A1A1AA]" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-[#A1A1AA]" />
                            <span className="font-semibold text-[#D97706]">{formatCurrency(booking.totalAmount)}</span>
                            <span className="text-xs text-[#A1A1AA]">({booking.type})</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          {t('viewDetails')}
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              {t('confirm')}
                            </Button>
                            <Button size="sm" variant="danger">
                              {t('decline')}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#D97706]"></div>
            <span className="text-sm text-[#52525B]">{t('equipment.cat320')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            <span className="text-sm text-[#52525B]">{t('equipment.sinotruk')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
            <span className="text-sm text-[#52525B]">{t('equipment.waterBowser')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
            <span className="text-sm text-[#52525B]">{t('equipment.crane')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
            <span className="text-sm text-[#52525B]">{t('equipment.loader')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="approved">{t('status.confirmed')}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="pending">{t('status.pending')}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
