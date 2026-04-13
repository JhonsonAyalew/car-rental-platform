import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Car,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  Timer,
  Truck,
  HardHat,
  Package,
  Send
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/admin/StatsCard';
import RecentBookingsTable from '../../components/admin/RecentBookingsTable';
import RecentSubmissionsTable from '../../components/admin/RecentSubmissionsTable';

const AdminDashboardPage = () => {
  const { t } = useTranslation('adminDashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [recentMaterialRequests, setRecentMaterialRequests] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  useEffect(() => {
    setTimeout(() => {
      // Updated Stats with Ethiopian Equipment
      setStats({
        totalEquipment: 234,
        activeBookings: 42,
        pendingSubmissions: 12,
        totalRevenue: 2845000, // in Birr
        totalUsers: 1240,
        equipmentOwners: 67,
        averageRating: 4.8,
        monthlyGrowth: 23,
        activeTimeSlots: 156,
        pendingMaterialRequests: 8,
        equipmentByType: {
          excavators: 45,
          loaders: 32,
          bulldozers: 18,
          cranes: 12,
          trucks: 89,
          other: 38
        }
      });

      // Revenue data in Birr
      setRevenueData([
        { name: t('charts.week1'), revenue: 425000, bookings: 32 },
        { name: t('charts.week2'), revenue: 538000, bookings: 41 },
        { name: t('charts.week3'), revenue: 612000, bookings: 48 },
        { name: t('charts.week4'), revenue: 745000, bookings: 56 },
      ]);

      setBookingData([
        { month: t('charts.jan'), bookings: 45, revenue: 1250000 },
        { month: t('charts.feb'), bookings: 52, revenue: 1480000 },
        { month: t('charts.mar'), bookings: 61, revenue: 1760000 },
        { month: t('charts.apr'), bookings: 58, revenue: 1690000 },
        { month: t('charts.may'), bookings: 73, revenue: 2120000 },
        { month: t('charts.jun'), bookings: 84, revenue: 2450000 },
      ]);

      // Recent Bookings - Ethiopian Equipment
      setRecentBookings([
        {
          id: 'BK-1001',
          customerName: 'Abebe Bekele',
          customerEmail: 'abebe@example.com',
          carName: 'CAT 320 Excavator',
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          amount: 42500,
          status: 'confirmed',
          hourlyRate: true,
          timeSlot: '8:00 AM - 5:00 PM',
          location: 'Addis Ababa'
        },
        {
          id: 'BK-1002',
          customerName: 'Selam Tesfaye',
          customerEmail: 'selam@example.com',
          carName: 'Komatsu D65 Bulldozer',
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10',
          startDate: '2024-01-21',
          endDate: '2024-01-23',
          amount: 27000,
          status: 'pending',
          hourlyRate: false,
          timeSlot: 'Full Day',
          location: 'Adama'
        },
        {
          id: 'BK-1003',
          customerName: 'Tekle Berhan',
          customerEmail: 'tekle@example.com',
          carName: 'Liebherr LTM 1050 Crane',
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10',
          startDate: '2024-01-19',
          endDate: '2024-01-22',
          amount: 54000,
          status: 'completed',
          hourlyRate: true,
          timeSlot: '10:00 AM - 4:00 PM',
          location: 'Addis Ababa'
        },
        {
          id: 'BK-1004',
          customerName: 'Meron Desta',
          customerEmail: 'meron@example.com',
          carName: 'Sinotruk HOWO 371',
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10',
          startDate: '2024-01-22',
          endDate: '2024-01-28',
          amount: 28800,
          status: 'confirmed',
          hourlyRate: false,
          timeSlot: 'Weekly Rental',
          location: 'Dire Dawa'
        }
      ]);

      // Recent Equipment Submissions - Ethiopian Equipment
      setRecentSubmissions([
        {
          id: 'SUB-001',
          carName: 'CAT 320 Excavator with Shovel',
          brand: 'Caterpillar',
          year: 2022,
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          ownerName: 'Getachew Alemayehu',
          ownerEmail: 'getachew@example.com',
          submittedDate: '2024-01-22',
          submittedTime: '10:30 AM',
          pricePerDay: 8500,
          pricePerHour: 1200,
          status: 'pending',
          equipmentType: 'Excavator',
          location: 'Addis Ababa'
        },
        {
          id: 'SUB-002',
          carName: 'SANY SY335 Excavator with Hammer',
          brand: 'SANY',
          year: 2023,
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_ud0B5zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10',
          ownerName: 'Tigist Worku',
          ownerEmail: 'tigist@example.com',
          submittedDate: '2024-01-21',
          submittedTime: '02:15 PM',
          pricePerDay: 7800,
          pricePerHour: 1100,
          status: 'pending',
          equipmentType: 'Excavator',
          location: 'Dire Dawa'
        },
        {
          id: 'SUB-003',
          carName: 'CAT 950 Wheel Loader',
          brand: 'Caterpillar',
          year: 2023,
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
          ownerName: 'Dawit Mekonnen',
          ownerEmail: 'dawit@example.com',
          submittedDate: '2024-01-20',
          submittedTime: '11:00 AM',
          pricePerDay: 7200,
          pricePerHour: 1000,
          status: 'review',
          equipmentType: 'Loader',
          location: 'Hawassa'
        },
        {
          id: 'SUB-004',
          carName: 'Water Bowser Automatic',
          brand: 'HOWO',
          year: 2022,
          carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcResbZoJc6aBKb_MqMX-OgTNpmok3LjV3HhfE7eE3D9gA&s',
          ownerName: 'Helen Ayele',
          ownerEmail: 'helen@example.com',
          submittedDate: '2024-01-19',
          submittedTime: '09:30 AM',
          pricePerDay: 4500,
          pricePerHour: 650,
          status: 'pending',
          equipmentType: 'Water Truck',
          location: 'Dire Dawa'
        }
      ]);

      // Material Requests with Ethiopian context
      setRecentMaterialRequests([
        {
          id: 'MAT-001',
          customerName: 'AB Construction PLC',
          materialType: 'Cement (Derba)',
          quantity: '500 bags',
          deliveryDate: '2024-01-25',
          equipmentBookingId: 'BK-1001',
          status: 'pending',
          totalAmount: 25000,
          location: 'Addis Ababa'
        },
        {
          id: 'MAT-002',
          customerName: 'XYZ Building Contractors',
          materialType: 'Sand (Construction)',
          quantity: '20 tons',
          deliveryDate: '2024-01-26',
          equipmentBookingId: 'BK-1003',
          status: 'confirmed',
          totalAmount: 8000,
          location: 'Adama'
        },
        {
          id: 'MAT-003',
          customerName: 'Nile Construction Enterprise',
          materialType: 'Steel Reinforcement',
          quantity: '100 pieces',
          deliveryDate: '2024-01-24',
          equipmentBookingId: 'BK-1004',
          status: 'shipped',
          totalAmount: 50000,
          location: 'Dire Dawa'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [t]);

  const COLORS = ['#D97706', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  const equipmentDistribution = [
    { name: t('equipmentTypes.excavators'), value: stats.equipmentByType?.excavators || 45, color: '#D97706' },
    { name: t('equipmentTypes.loaders'), value: stats.equipmentByType?.loaders || 32, color: '#10B981' },
    { name: t('equipmentTypes.bulldozers'), value: stats.equipmentByType?.bulldozers || 18, color: '#3B82F6' },
    { name: t('equipmentTypes.cranes'), value: stats.equipmentByType?.cranes || 12, color: '#8B5CF6' },
    { name: t('equipmentTypes.trucks'), value: stats.equipmentByType?.trucks || 89, color: '#F59E0B' },
    { name: t('equipmentTypes.other'), value: stats.equipmentByType?.other || 38, color: '#EF4444' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-[#D97706] animate-spin mx-auto mb-4" />
          <p className="text-[#52525B]">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{t('header.title')}</h1>
          <p className="text-[#52525B] mt-1">{t('header.subtitle')}</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex bg-white rounded-lg border border-[#E4E4E7] p-1">
            {['daily', 'weekly', 'monthly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition capitalize
                  ${selectedPeriod === period 
                    ? 'bg-[#D97706] text-white' 
                    : 'text-[#52525B] hover:bg-[#F3F2EE]'}
                `}
              >
                {t(`periodSelector.${period}`)}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            {t('header.exportReport')}
          </Button>
        </div>
      </div>

      {/* Stats Grid - in Birr */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title={t('stats.totalEquipment')}
          value={stats.totalEquipment}
          icon={HardHat}
          trend={{ isPositive: true, value: 12 }}
        />
        <StatsCard
          title={t('stats.activeBookings')}
          value={stats.activeBookings}
          icon={Calendar}
          trend={{ isPositive: true, value: 8 }}
          color="#10B981"
          bgColor="#DCFCE7"
        />
        <StatsCard
          title={t('stats.pendingSubmissions')}
          value={stats.pendingSubmissions}
          icon={Clock}
          trend={{ isPositive: false, value: 2 }}
          color="#F59E0B"
          bgColor="#FEF3C7"
        />
        <StatsCard
          title={t('stats.totalRevenue')}
          value={`ETB ${(stats.totalRevenue / 1000).toFixed(0)}k`}
          icon={DollarSign}
          trend={{ isPositive: true, value: 23 }}
          color="#8B5CF6"
          bgColor="#EDE9FE"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-[#A1A1AA] text-sm">{t('stats.totalUsers')}</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.totalUsers}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600">+156 {t('stats.newThisMonth')}</span>
            </div>
          </div>
          <Users className="w-10 h-10 text-[#D97706] opacity-50" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-[#A1A1AA] text-sm">{t('stats.equipmentOwners')}</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.equipmentOwners}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600">+8 {t('stats.newThisMonth')}</span>
            </div>
          </div>
          <Truck className="w-10 h-10 text-[#10B981] opacity-50" />
        </Card>

        <Link to="/admin/time-controller">
          <Card className="flex items-center justify-between cursor-pointer hover:shadow-medium transition">
            <div>
              <p className="text-[#A1A1AA] text-sm">{t('stats.activeTimeSlots')}</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stats.activeTimeSlots}</p>
              <div className="flex items-center gap-1 mt-1">
                <Timer className="w-3 h-3 text-[#D97706]" />
                <span className="text-xs text-[#D97706]">{t('stats.timeControllerActive')}</span>
              </div>
            </div>
            <Timer className="w-10 h-10 text-[#D97706] opacity-50" />
          </Card>
        </Link>

        <Link to="/admin/materials">
          <Card className="flex items-center justify-between cursor-pointer hover:shadow-medium transition">
            <div>
              <p className="text-[#A1A1AA] text-sm">{t('stats.materialRequests')}</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stats.pendingMaterialRequests}</p>
              <div className="flex items-center gap-1 mt-1">
                <Package className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">{t('stats.pendingDelivery')}</span>
              </div>
            </div>
            <Package className="w-10 h-10 text-[#10B981] opacity-50" />
          </Card>
        </Link>
      </div>

      {/* Charts Section - Updated for Birr */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('charts.revenueOverview')}</h2>
            <select className="text-sm border border-[#E4E4E7] rounded-lg px-2 py-1 bg-white">
              <option>{t('charts.last4Weeks')}</option>
              <option>{t('charts.last3Months')}</option>
              <option>{t('charts.lastYear')}</option>
            </select>
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
              <XAxis dataKey="name" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" tickFormatter={(value) => `ETB ${value/1000}k`} />
              <Tooltip 
                formatter={(value) => [`ETB ${value.toLocaleString()}`, t('charts.revenue')]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#D97706" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
              <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#D97706] rounded-full"></div>
              <span className="text-[#52525B]">{t('charts.revenue')} (ETB)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <span className="text-[#52525B]">{t('charts.bookings')}</span>
            </div>
          </div>
        </Card>

        {/* Equipment Distribution Pie Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('charts.equipmentDistribution')}</h2>
            <Button variant="ghost" size="sm">{t('charts.viewDetails')}</Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={equipmentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {equipmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('charts.monthlyTrends')}</h2>
          <Button variant="ghost" size="sm">{t('charts.viewDetails')}</Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
            <XAxis dataKey="month" stroke="#A1A1AA" />
            <YAxis yAxisId="left" stroke="#A1A1AA" />
            <YAxis yAxisId="right" orientation="right" stroke="#A1A1AA" tickFormatter={(value) => `ETB ${value/1000}k`} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return [`ETB ${value.toLocaleString()}`, t('charts.revenue')];
                return [value, t('charts.bookings')];
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" fill="#D97706" radius={[8, 8, 0, 0]} />
            <Bar yAxisId="right" dataKey="revenue" fill="#10B981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Pending Equipment Submissions */}
      <Card>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D97706]" />
              {t('submissions.title')}
              {stats.pendingSubmissions > 0 && (
                <span className="bg-[#D97706] text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingSubmissions} {t('submissions.needReview')}
                </span>
              )}
            </h2>
            <p className="text-sm text-[#52525B] mt-1">{t('submissions.subtitle')}</p>
          </div>
          <Link to="/admin/submissions">
            <Button variant="secondary" iconLeft={<Eye className="w-4 h-4" />}>
              {t('submissions.viewAll')}
            </Button>
          </Link>
        </div>
        <RecentSubmissionsTable submissions={recentSubmissions} />
      </Card>

      {/* Material Requests Section */}
      <Card>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#D97706]" />
              {t('materialRequests.title')}
              {stats.pendingMaterialRequests > 0 && (
                <span className="bg-[#10B981] text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingMaterialRequests} {t('materialRequests.pending')}
                </span>
              )}
            </h2>
            <p className="text-sm text-[#52525B] mt-1">{t('materialRequests.subtitle')}</p>
          </div>
          <Link to="/admin/materials">
            <Button variant="secondary" iconLeft={<Send className="w-4 h-4" />}>
              {t('materialRequests.manageMaterials')}
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#E4E4E7]">
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.orderId')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.customer')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.material')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.quantity')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.location')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.deliveryDate')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.amount')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.status')}</th>
                <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">{t('materialRequests.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {recentMaterialRequests.map((request) => (
                <tr key={request.id} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6] transition">
                  <td className="py-3 px-4 text-sm font-medium text-[#1A1A1A]">{request.id}</td>
                  <td className="py-3 px-4 text-sm">{request.customerName}</td>
                  <td className="py-3 px-4 text-sm">{request.materialType}</td>
                  <td className="py-3 px-4 text-sm">{request.quantity}</td>
                  <td className="py-3 px-4 text-sm">{request.location}</td>
                  <td className="py-3 px-4 text-sm">{request.deliveryDate}</td>
                  <td className="py-3 px-4 text-sm font-medium text-[#D97706]">ETB {request.totalAmount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                      ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'}`}>
                      {t(`materialRequests.statuses.${request.status}`)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button size="sm" variant="ghost">{t('materialRequests.table.actions')}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D97706]" />
              {t('bookings.title')}
            </h2>
            <p className="text-sm text-[#52525B] mt-1">{t('bookings.subtitle')}</p>
          </div>
          <Link to="/admin/bookings">
            <Button variant="ghost">{t('bookings.viewAll')}</Button>
          </Link>
        </div>
        <RecentBookingsTable bookings={recentBookings} />
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-5 gap-4">
        <Link to="/admin/submissions">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Clock className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">{t('quickActions.reviewSubmissions')}</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.pendingSubmissions} {t('quickActions.pending')}</p>
          </Card>
        </Link>
        
        <Link to="/admin/time-controller">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7] border-2 border-[#D97706]/30">
            <Timer className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition animate-pulse" />
            <h3 className="font-semibold mb-1 text-[#D97706]">{t('quickActions.timeController')}</h3>
            <p className="text-xs text-[#A1A1AA]">{t('quickActions.manageAvailability')}</p>
          </Card>
        </Link>
        
        <Link to="/admin/equipment">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <HardHat className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">{t('quickActions.manageEquipment')}</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.totalEquipment} {t('quickActions.totalListings')}</p>
          </Card>
        </Link>
        
        <Link to="/admin/owners">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Users className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">{t('quickActions.equipmentOwners')}</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.equipmentOwners} {t('quickActions.registered')}</p>
          </Card>
        </Link>
        
        <Link to="/admin/materials">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Package className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">{t('quickActions.materialOrders')}</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.pendingMaterialRequests} {t('quickActions.pending')}</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
