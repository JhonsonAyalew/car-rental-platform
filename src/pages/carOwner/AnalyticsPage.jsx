import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  Truck,
  Eye,
  Star,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Clock,
  HardHat,
  MapPin,
  Activity
} from 'lucide-react';

const AnalyticsPage = () => {
  const { t } = useTranslation('analytics');
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [equipmentPerformance, setEquipmentPerformance] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [weeklyTrend, setWeeklyTrend] = useState([]);
  
  useEffect(() => {
    fetchAnalytics();
  }, [period]);
  
  const fetchAnalytics = () => {
    setLoading(true);
    setTimeout(() => {
      // Stats
      setStats({
        totalRevenue: 284500,
        totalBookings: 48,
        totalEquipment: 16,
        totalCustomers: 32,
        averageRating: 4.8,
        utilizationRate: 68,
        repeatCustomers: 12,
        cancellationRate: 4.2,
        averageDailyRevenue: 9483,
        mostBookedEquipment: 'CAT 320 Excavator'
      });
      
      // Revenue Data
      setRevenueData([
        { month: t('months.october'), revenue: 42500, bookings: 6 },
        { month: t('months.november'), revenue: 48200, bookings: 7 },
        { month: t('months.december'), revenue: 56800, bookings: 9 },
        { month: t('months.january'), revenue: 62400, bookings: 10 },
        { month: t('months.february'), revenue: 58600, bookings: 9 },
        { month: t('months.march'), revenue: 67200, bookings: 11 }
      ]);
      
      // Booking Trends
      setBookingData([
        { week: 'Week 1', hourly: 8, daily: 3, weekly: 1 },
        { week: 'Week 2', hourly: 12, daily: 4, weekly: 2 },
        { week: 'Week 3', hourly: 10, daily: 5, weekly: 1 },
        { week: 'Week 4', hourly: 15, daily: 6, weekly: 2 }
      ]);
      
      // Equipment Performance
      setEquipmentPerformance([
        { name: 'CAT 320 Excavator', bookings: 12, revenue: 102000, utilization: 85 },
        { name: 'Sinotruk HOWO 371', bookings: 8, revenue: 38400, utilization: 72 },
        { name: 'Liebherr LTM 1050', bookings: 4, revenue: 72000, utilization: 45 },
        { name: 'Water Bowser', bookings: 6, revenue: 22800, utilization: 68 },
        { name: 'CAT 950 Loader', bookings: 5, revenue: 36000, utilization: 62 }
      ]);
      
      // Top Customers
      setTopCustomers([
        { name: 'Tekle Construction', bookings: 8, totalSpent: 42500, location: 'Addis Ababa' },
        { name: 'Mesfin Engineering', bookings: 6, totalSpent: 38400, location: 'Adama' },
        { name: 'Hawassa Construction', bookings: 5, totalSpent: 31200, location: 'Hawassa' },
        { name: 'Dire Dawa Builders', bookings: 4, totalSpent: 28600, location: 'Dire Dawa' },
        { name: 'Gondar Roads PLC', bookings: 3, totalSpent: 22500, location: 'Gondar' }
      ]);
      
      // Weekly Trends
      setWeeklyTrend([
        { day: t('weekDays.monday'), bookings: 6, revenue: 42500 },
        { day: t('weekDays.tuesday'), bookings: 5, revenue: 38200 },
        { day: t('weekDays.wednesday'), bookings: 8, revenue: 56800 },
        { day: t('weekDays.thursday'), bookings: 7, revenue: 49600 },
        { day: t('weekDays.friday'), bookings: 9, revenue: 62400 },
        { day: t('weekDays.saturday'), bookings: 4, revenue: 28500 },
        { day: t('weekDays.sunday'), bookings: 2, revenue: 14200 }
      ]);
      
      setLoading(false);
    }, 1500);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const COLORS = ['#D97706', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-[#1A1A1A]">{t('title')}</h1>
              <span className="text-2xl">🇪🇹</span>
            </div>
            <p className="text-[#52525B]">{t('subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white rounded-lg border border-[#E4E4E7] p-1">
              {['weekly', 'monthly', 'yearly'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition capitalize ${
                    period === p ? 'bg-[#D97706] text-white' : 'text-[#52525B] hover:bg-[#F3F2EE]'
                  }`}
                >
                  {t(`periods.${p}`)}
                </button>
              ))}
            </div>
            <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
              {t('export')}
            </Button>
            <Button variant="ghost" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={fetchAnalytics}>
              {t('refresh')}
            </Button>
          </div>
        </div>
        
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-center">
            <DollarSign className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
            <p className="text-xl font-bold text-[#1A1A1A]">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-[#A1A1AA]">{t('stats.totalRevenue')}</p>
            <Badge variant="approved" className="mt-1">+18%</Badge>
          </Card>
          <Card className="text-center">
            <Calendar className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
            <p className="text-xl font-bold text-[#1A1A1A]">{stats.totalBookings}</p>
            <p className="text-xs text-[#A1A1AA]">{t('stats.totalBookings')}</p>
            <Badge variant="approved" className="mt-1">+12</Badge>
          </Card>
          <Card className="text-center">
            <HardHat className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
            <p className="text-xl font-bold text-[#1A1A1A]">{stats.totalEquipment}</p>
            <p className="text-xs text-[#A1A1AA]">{t('stats.totalEquipment')}</p>
          </Card>
          <Card className="text-center">
            <Users className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
            <p className="text-xl font-bold text-[#1A1A1A]">{stats.totalCustomers}</p>
            <p className="text-xs text-[#A1A1AA]">{t('stats.totalCustomers')}</p>
          </Card>
          <Card className="text-center">
            <Star className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
            <p className="text-xl font-bold text-[#1A1A1A]">{stats.averageRating}</p>
            <p className="text-xs text-[#A1A1AA]">{t('stats.averageRating')}</p>
            <Badge variant="approved" className="mt-1">⭐ 4.8</Badge>
          </Card>
          <Card className="text-center">
            <Activity className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
            <p className="text-xl font-bold text-[#1A1A1A]">{stats.utilizationRate}%</p>
            <p className="text-xs text-[#A1A1AA]">{t('stats.utilizationRate')}</p>
            <Badge variant="approved" className="mt-1">+5%</Badge>
          </Card>
        </div>
        
        {/* Revenue Chart */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{t('charts.revenueOverview')}</h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+18% {t('growth.revenueGrowth')}</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                <XAxis dataKey="month" stroke="#A1A1AA" />
                <YAxis stroke="#A1A1AA" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E4E4E7', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#D97706" fillOpacity={1} fill="url(#colorRevenue)" name={t('chartLabels.revenue')} />
                <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} name={t('chartLabels.bookings')} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          
          {/* Equipment Performance Pie Chart */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">{t('charts.equipmentPerformance')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={equipmentPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {equipmentPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
        
        {/* Booking Trends */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-lg font-semibold mb-4">{t('charts.bookingTrends')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                <XAxis dataKey="week" stroke="#A1A1AA" />
                <YAxis stroke="#A1A1AA" />
                <Tooltip />
                <Legend />
                <Bar dataKey="hourly" fill="#D97706" radius={[8, 8, 0, 0]} name={t('chartLabels.hourly')} />
                <Bar dataKey="daily" fill="#10B981" radius={[8, 8, 0, 0]} name={t('chartLabels.daily')} />
                <Bar dataKey="weekly" fill="#3B82F6" radius={[8, 8, 0, 0]} name={t('chartLabels.weekly')} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          
          {/* Weekly Performance */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">{t('charts.weeklyPerformance')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                <XAxis dataKey="day" stroke="#A1A1AA" />
                <YAxis yAxisId="left" stroke="#A1A1AA" />
                <YAxis yAxisId="right" orientation="right" stroke="#A1A1AA" />
                <Tooltip formatter={(value, name) => name === 'revenue' ? formatCurrency(value) : value} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#D97706" strokeWidth={2} name={t('chartLabels.bookings')} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name={t('chartLabels.revenue')} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
        
        {/* Equipment Performance Table */}
        <Card className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HardHat className="text-[#D97706]" />
            {t('charts.equipmentDetails')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E4E4E7]">
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.equipment')}</th>
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.bookings')}</th>
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.revenue')}</th>
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.utilization')}</th>
                </tr>
              </thead>
              <tbody>
                {equipmentPerformance.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6]">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="py-3">{item.bookings} {t('chartLabels.bookingsCount')}</td>
                    <td className="py-3">{formatCurrency(item.revenue)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                          <div className="h-full bg-[#D97706] rounded-full" style={{ width: `${item.utilization}%` }} />
                        </div>
                        <span className="text-sm">{item.utilization}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Top Customers */}
        <Card>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="text-[#D97706]" />
            {t('charts.topCustomers')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E4E4E7]">
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.customerName')}</th>
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.location')}</th>
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.bookings')}</th>
                  <th className="text-left py-3 text-sm font-medium text-[#52525B]">{t('tableHeaders.totalSpent')}</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer, idx) => (
                  <tr key={idx} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6]">
                    <td className="py-3 font-medium">{customer.name}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#A1A1AA]" />
                        {customer.location}
                      </div>
                    </td>
                    <td className="py-3">{customer.bookings} {t('chartLabels.bookingsCount')}</td>
                    <td className="py-3 font-semibold text-[#D97706]">{formatCurrency(customer.totalSpent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Insights Section */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">{t('insights.topEquipment.title')}</h3>
                <p className="text-sm text-green-700">
                  {t('insights.topEquipment.description', { equipment: stats.mostBookedEquipment, rate: '85%' })}
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800">{t('insights.topRegion.title')}</h3>
                <p className="text-sm text-blue-700">
                  {t('insights.topRegion.description', { percent: '65' })}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
