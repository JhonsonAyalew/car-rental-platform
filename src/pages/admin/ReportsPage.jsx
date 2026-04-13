import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  Users,
  HardHat,
  TrendingUp,
  PieChart,
  BarChart3,
  Printer,
  Mail,
  Filter,
  RefreshCw,
  Eye,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  Package,
  Star,
  MapPin,
  Building
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const ReportsPage = () => {
  const { t } = useTranslation('reports');
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState('revenue');
  const [dateRange, setDateRange] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generating, setGenerating] = useState(false);
  
  // Report data
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topEquipment, setTopEquipment] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = () => {
    setLoading(true);
    setTimeout(() => {
      // Revenue data by month
      setRevenueData([
        { month: 'Jul 2023', revenue: 185000, bookings: 32, profit: 27750 },
        { month: 'Aug 2023', revenue: 212000, bookings: 38, profit: 31800 },
        { month: 'Sep 2023', revenue: 248000, bookings: 45, profit: 37200 },
        { month: 'Oct 2023', revenue: 235000, bookings: 42, profit: 35250 },
        { month: 'Nov 2023', revenue: 289000, bookings: 52, profit: 43350 },
        { month: 'Dec 2023', revenue: 342000, bookings: 61, profit: 51300 },
        { month: 'Jan 2024', revenue: 398000, bookings: 71, profit: 59700 }
      ]);
      
      // Booking trends
      setBookingData([
        { date: 'Week 1', bookings: 12, completed: 10, cancelled: 2 },
        { date: 'Week 2', bookings: 18, completed: 16, cancelled: 2 },
        { date: 'Week 3', bookings: 15, completed: 14, cancelled: 1 },
        { date: 'Week 4', bookings: 22, completed: 20, cancelled: 2 }
      ]);
      
      // Equipment performance
      setEquipmentData([
        { name: 'CAT 320 Excavator', revenue: 382500, bookings: 45, rating: 4.9 },
        { name: 'Sinotruk HOWO', revenue: 321600, bookings: 67, rating: 4.6 },
        { name: 'CAT 950 Loader', revenue: 374400, bookings: 52, rating: 4.9 },
        { name: 'Komatsu Bulldozer', revenue: 306000, bookings: 34, rating: 4.8 },
        { name: 'Liebherr Crane', revenue: 270000, bookings: 15, rating: 4.9 }
      ]);
      
      // Top customers
      setTopCustomers([
        { name: 'Abebe Bekele', totalSpent: 185000, bookings: 12, avgRating: 4.9 },
        { name: 'Selam Tesfaye', totalSpent: 124000, bookings: 8, avgRating: 4.8 },
        { name: 'Tekle Berhan', totalSpent: 89000, bookings: 5, avgRating: 4.7 },
        { name: 'Meron Desta', totalSpent: 68000, bookings: 4, avgRating: 4.6 },
        { name: 'Dawit Mekonnen', totalSpent: 45000, bookings: 3, avgRating: 4.8 }
      ]);
      
      // Top equipment by category
      setTopEquipment([
        { name: 'Excavators', count: 45, revenue: 425000, utilization: 78 },
        { name: 'Loaders', count: 32, revenue: 298000, utilization: 72 },
        { name: 'Dump Trucks', count: 89, revenue: 385000, utilization: 65 },
        { name: 'Bulldozers', count: 18, revenue: 189000, utilization: 58 },
        { name: 'Cranes', count: 12, revenue: 175000, utilization: 52 }
      ]);
      
      // Category distribution for pie chart
      setCategoryData([
        { name: 'Excavators', value: 45, color: '#D97706' },
        { name: 'Loaders', value: 32, color: '#10B981' },
        { name: 'Dump Trucks', value: 89, color: '#3B82F6' },
        { name: 'Bulldozers', value: 18, color: '#8B5CF6' },
        { name: 'Cranes', value: 12, color: '#F59E0B' },
        { name: 'Others', value: 38, color: '#EF4444' }
      ]);
      
      // Location distribution
      setLocationData([
        { city: 'Addis Ababa', count: 95, revenue: 1250000 },
        { city: 'Dire Dawa', count: 45, revenue: 580000 },
        { city: 'Adama', count: 32, revenue: 420000 },
        { city: 'Hawassa', count: 28, revenue: 365000 },
        { city: 'Bahir Dar', count: 22, revenue: 285000 },
        { city: 'Mekelle', count: 18, revenue: 235000 }
      ]);
      
      setLoading(false);
    }, 1000);
  };

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      toast.success('Report generated successfully!');
      setGenerating(false);
    }, 1500);
  };

  const handleExportReport = (format) => {
    toast.success(`Report exported as ${format.toUpperCase()}`);
  };

  const reportTypes = [
    { id: 'revenue', label: t('reportTypes.revenue'), icon: DollarSign, color: '#D97706' },
    { id: 'bookings', label: t('reportTypes.bookings'), icon: Calendar, color: '#10B981' },
    { id: 'equipment', label: t('reportTypes.equipment'), icon: HardHat, color: '#3B82F6' },
    { id: 'customers', label: t('reportTypes.customers'), icon: Users, color: '#8B5CF6' },
    { id: 'analytics', label: t('reportTypes.analytics'), icon: TrendingUp, color: '#F59E0B' }
  ];

  const summaryStats = {
    totalRevenue: 1909000,
    totalBookings: 341,
    activeEquipment: 234,
    totalCustomers: 1240,
    avgDailyRate: 6250,
    utilization: 68
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
          <Button variant="ghost" onClick={fetchReportData} iconLeft={<RefreshCw className="w-4 h-4" />}>
            {t('header.refresh')}
          </Button>
          <Button onClick={handleGenerateReport} isLoading={generating} iconLeft={<FileText className="w-4 h-4" />}>
            {t('header.generateReport')}
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-white rounded-lg border border-[#E4E4E7] p-1">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition capitalize ${
                  dateRange === range ? 'bg-[#D97706] text-white' : 'text-[#52525B] hover:bg-[#F3F2EE]'
                }`}
              >
                {t(`dateRange.${range}`)}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex gap-3">
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-36" />
            <span className="text-[#52525B]">{t('dateRange.to')}</span>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-36" />
          </div>
          <Button variant="secondary" iconLeft={<Filter className="w-4 h-4" />}>
            {t('dateRange.applyFilter')}
          </Button>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <DollarSign className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#1A1A1A]">ETB {(summaryStats.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#52525B]">{t('summaryStats.totalRevenue')}</p>
        </Card>
        <Card className="text-center">
          <Calendar className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#1A1A1A]">{summaryStats.totalBookings}</p>
          <p className="text-xs text-[#52525B]">{t('summaryStats.totalBookings')}</p>
        </Card>
        <Card className="text-center">
          <HardHat className="w-6 h-6 text-[#3B82F6] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#1A1A1A]">{summaryStats.activeEquipment}</p>
          <p className="text-xs text-[#52525B]">{t('summaryStats.activeEquipment')}</p>
        </Card>
        <Card className="text-center">
          <Users className="w-6 h-6 text-[#8B5CF6] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#1A1A1A]">{summaryStats.totalCustomers}</p>
          <p className="text-xs text-[#52525B]">{t('summaryStats.totalCustomers')}</p>
        </Card>
        <Card className="text-center">
          <TrendingUp className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#1A1A1A]">{summaryStats.utilization}%</p>
          <p className="text-xs text-[#52525B]">{t('summaryStats.utilizationRate')}</p>
        </Card>
      </div>

      {/* Report Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveReport(type.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${activeReport === type.id 
                  ? 'bg-[#D97706] text-white' 
                  : 'bg-white text-[#52525B] border border-[#E4E4E7] hover:border-[#D97706]'}
              `}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {/* Revenue Report */}
        {activeReport === 'revenue' && (
          <>
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('revenueReport.title')}</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleExportReport('pdf')} iconLeft={<Download className="w-3 h-3" />}>
                    {t('export.pdf')}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleExportReport('excel')} iconLeft={<Download className="w-3 h-3" />}>
                    {t('export.excel')}
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                  <XAxis dataKey="month" stroke="#A1A1AA" />
                  <YAxis stroke="#A1A1AA" tickFormatter={(value) => `ETB ${value/1000}k`} />
                  <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#D97706" fillOpacity={1} fill="url(#colorRevenue)" name={t('revenueReport.revenue')} />
                  <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" name={t('revenueReport.platformProfit')} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-4">{t('revenueReport.revenueByEquipmentType')}</h3>
                <div className="space-y-3">
                  {topEquipment.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.name}</span>
                        <span className="font-medium text-[#D97706]">ETB {(item.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#D97706] rounded-full" style={{ width: `${(item.revenue / 425000) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">{t('revenueReport.revenueByLocation')}</h3>
                <div className="space-y-3">
                  {locationData.slice(0, 5).map((loc, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{loc.city}</span>
                        <span className="font-medium text-[#D97706]">ETB {(loc.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${(loc.revenue / 1250000) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Booking Report */}
        {activeReport === 'bookings' && (
          <>
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('bookingReport.title')}</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleExportReport('pdf')} iconLeft={<Download className="w-3 h-3" />}>
                    {t('export.pdf')}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleExportReport('excel')} iconLeft={<Download className="w-3 h-3" />}>
                    {t('export.excel')}
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                  <XAxis dataKey="date" stroke="#A1A1AA" />
                  <YAxis stroke="#A1A1AA" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#D97706" radius={[8, 8, 0, 0]} name={t('bookingReport.totalBookings')} />
                  <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} name={t('bookingReport.completed')} />
                  <Bar dataKey="cancelled" fill="#EF4444" radius={[8, 8, 0, 0]} name={t('bookingReport.cancelled')} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-4">{t('bookingReport.statusDistribution')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('bookingReport.completedPercent')}</span>
                    <span className="text-green-600">245 (72%)</span>
                  </div>
                  <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>{t('bookingReport.activePending')}</span>
                    <span className="text-yellow-600">68 (20%)</span>
                  </div>
                  <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>{t('bookingReport.cancelledPercent')}</span>
                    <span className="text-red-600">28 (8%)</span>
                  </div>
                  <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '8%' }} />
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">{t('bookingReport.peakHours')}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('bookingReport.morning')}</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('bookingReport.afternoon')}</span>
                      <span>35%</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('bookingReport.evening')}</span>
                      <span>15%</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('bookingReport.night')}</span>
                      <span>5%</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Equipment Report */}
        {activeReport === 'equipment' && (
          <>
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('equipmentReport.title')}</h2>
                <Button variant="ghost" size="sm" onClick={() => handleExportReport('pdf')} iconLeft={<Download className="w-3 h-3" />}>
                  {t('equipmentReport.export')}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                
                <div>
                  <h3 className="font-semibold mb-3">{t('equipmentReport.topPerforming')}</h3>
                  <div className="space-y-3">
                    {topEquipment.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-[#F9F8F6] rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-[#52525B]">{item.count} {t('equipmentReport.units')} • {item.utilization}% {t('equipmentReport.utilized')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#D97706]">ETB {(item.revenue / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-[#52525B]">{t('equipmentReport.revenue')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">{t('equipmentReport.utilizationByCity')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#E4E4E7]">
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('equipmentReport.table.city')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('equipmentReport.table.equipmentCount')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('equipmentReport.table.utilizationRate')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('equipmentReport.table.avgDailyRate')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationData.map((loc, idx) => (
                      <tr key={idx} className="border-b border-[#E4E4E7]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-[#52525B]" />
                            {loc.city}
                          </div>
                        </td>
                        <td className="py-3 px-4">{loc.count}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-[#F3F2EE] rounded-full overflow-hidden">
                              <div className="h-full bg-[#D97706] rounded-full" style={{ width: `${65 + Math.random() * 20}%` }} />
                            </div>
                            <span className="text-sm">{65 + Math.floor(Math.random() * 20)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">ETB {(loc.revenue / loc.count / 30).toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* Customer Report */}
        {activeReport === 'customers' && (
          <>
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('customerReport.title')}</h2>
                <Button variant="ghost" size="sm" onClick={() => handleExportReport('pdf')} iconLeft={<Download className="w-3 h-3" />}>
                  {t('customerReport.export')}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#E4E4E7]">
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('customerReport.table.customer')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('customerReport.table.totalSpent')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('customerReport.table.bookings')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('customerReport.table.avgRating')}</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">{t('customerReport.table.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((customer, idx) => (
                      <tr key={idx} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#D97706]/20 flex items-center justify-center">
                              <Users className="w-4 h-4 text-[#D97706]" />
                            </div>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-[#D97706]">ETB {customer.totalSpent.toLocaleString()}</td>
                        <td className="py-3 px-4">{customer.bookings}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {customer.avgRating}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="approved">{t('customerReport.active')}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-4">{t('customerReport.customerAcquisition')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                    <XAxis dataKey="month" stroke="#A1A1AA" />
                    <YAxis stroke="#A1A1AA" />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#D97706" strokeWidth={2} name={t('customerReport.newCustomers')} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">{t('customerReport.satisfaction')}</h3>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold text-[#D97706] mb-2">4.8</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-[#52525B]">{t('customerReport.basedOn')} 342 {t('customerReport.reviews')}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-xs text-[#52525B]">{t('customerReport.wouldRecommend')}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-xs text-[#52525B]">{t('customerReport.satisfied')}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Analytics Report */}
        {activeReport === 'analytics' && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-4">{t('analytics.monthlyGrowth')}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                    <XAxis dataKey="month" stroke="#A1A1AA" />
                    <YAxis stroke="#A1A1AA" tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, t('analytics.growth')]} />
                    <Area type="monotone" dataKey="bookings" stroke="#D97706" fill="#FEF3C7" name={t('analytics.growth')} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">{t('analytics.keyMetrics')}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('analytics.conversionRate')}</span>
                      <span className="font-medium">24.5%</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: '24.5%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('analytics.customerRetention')}</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#10B981] rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('analytics.avgResponseTime')}</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('analytics.equipmentTurnover')}</span>
                      <span className="font-medium">3.2 days</span>
                    </div>
                    <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="font-semibold mb-4">{t('analytics.platformInsights')}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FEF3C7] rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#D97706] mb-2" />
                  <p className="text-2xl font-bold">+23%</p>
                  <p className="text-sm text-[#52525B]">{t('analytics.revenueGrowth')}</p>
                </div>
                <div className="p-4 bg-[#DCFCE7] rounded-lg">
                  <Users className="w-8 h-8 text-green-600 mb-2" />
                  <p className="text-2xl font-bold">+156</p>
                  <p className="text-sm text-[#52525B]">{t('analytics.newCustomersThisMonth')}</p>
                </div>
                <div className="p-4 bg-[#DBEAFE] rounded-lg">
                  <HardHat className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">+23</p>
                  <p className="text-sm text-[#52525B]">{t('analytics.newEquipmentAdded')}</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Export Options */}
      <Card className="bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7]/30">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold">{t('exportOptions.title')}</h3>
            <p className="text-sm text-[#52525B]">{t('exportOptions.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => handleExportReport('pdf')} iconLeft={<FileText className="w-4 h-4" />}>
              {t('export.pdf')} Report
            </Button>
            <Button variant="secondary" onClick={() => handleExportReport('excel')} iconLeft={<Download className="w-4 h-4" />}>
              {t('export.excel')} Report
            </Button>
            <Button variant="secondary" onClick={() => handleExportReport('csv')} iconLeft={<Download className="w-4 h-4" />}>
              {t('export.csv')}
            </Button>
            <Button variant="secondary" onClick={() => toast.success('Report sent to email!')} iconLeft={<Mail className="w-4 h-4" />}>
              {t('export.email')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;
