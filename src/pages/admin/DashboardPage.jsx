import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Eye
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/admin/StatsCard';
import RecentBookingsTable from '../../components/admin/RecentBookingsTable';
import RecentSubmissionsTable from '../../components/admin/RecentSubmissionsTable';

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Stats
      setStats({
        totalCars: 156,
        activeBookings: 42,
        pendingSubmissions: 8,
        totalRevenue: 28450,
        totalUsers: 1240,
        carOwners: 89,
        averageRating: 4.8,
        monthlyGrowth: 23
      });

      // Revenue data for chart
      setRevenueData([
        { name: 'Week 1', revenue: 4250, bookings: 32 },
        { name: 'Week 2', revenue: 5380, bookings: 41 },
        { name: 'Week 3', revenue: 6120, bookings: 48 },
        { name: 'Week 4', revenue: 7450, bookings: 56 },
      ]);

      // Booking trends
      setBookingData([
        { month: 'Jan', bookings: 45, revenue: 12500 },
        { month: 'Feb', bookings: 52, revenue: 14800 },
        { month: 'Mar', bookings: 61, revenue: 17600 },
        { month: 'Apr', bookings: 58, revenue: 16900 },
        { month: 'May', bookings: 73, revenue: 21200 },
        { month: 'Jun', bookings: 84, revenue: 24500 },
      ]);

      // Recent bookings
      setRecentBookings([
        {
          id: 'BK-1001',
          customerName: 'John Smith',
          customerEmail: 'john@example.com',
          carName: 'Tesla Model 3',
          carImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100',
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          amount: 600,
          status: 'confirmed'
        },
        {
          id: 'BK-1002',
          customerName: 'Sarah Johnson',
          customerEmail: 'sarah@example.com',
          carName: 'Toyota Camry',
          carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100',
          startDate: '2024-01-21',
          endDate: '2024-01-23',
          amount: 195,
          status: 'pending'
        },
        {
          id: 'BK-1003',
          customerName: 'Mike Brown',
          customerEmail: 'mike@example.com',
          carName: 'BMW X5',
          carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100',
          startDate: '2024-01-19',
          endDate: '2024-01-22',
          amount: 380,
          status: 'completed'
        },
        {
          id: 'BK-1004',
          customerName: 'Emily Davis',
          customerEmail: 'emily@example.com',
          carName: 'Honda CR-V',
          carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100',
          startDate: '2024-01-22',
          endDate: '2024-01-28',
          amount: 385,
          status: 'confirmed'
        }
      ]);

      // Recent submissions
      setRecentSubmissions([
        {
          id: 'SUB-001',
          carName: 'Mercedes C-Class',
          brand: 'Mercedes',
          year: 2023,
          carImage: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=100',
          ownerName: 'David Wilson',
          ownerEmail: 'david@example.com',
          submittedDate: '2024-01-22',
          submittedTime: '10:30 AM',
          pricePerDay: 95,
          status: 'pending'
        },
        {
          id: 'SUB-002',
          carName: 'Audi Q5',
          brand: 'Audi',
          year: 2022,
          carImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100',
          ownerName: 'Lisa Anderson',
          ownerEmail: 'lisa@example.com',
          submittedDate: '2024-01-21',
          submittedTime: '02:15 PM',
          pricePerDay: 110,
          status: 'pending'
        },
        {
          id: 'SUB-003',
          carName: 'Ford Mustang',
          brand: 'Ford',
          year: 2023,
          carImage: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=100',
          ownerName: 'Tom Harris',
          ownerEmail: 'tom@example.com',
          submittedDate: '2024-01-20',
          submittedTime: '11:00 AM',
          pricePerDay: 130,
          status: 'review'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const COLORS = ['#D97706', '#10B981', '#3B82F6', '#8B5CF6'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-[#D97706] animate-spin mx-auto mb-4" />
          <p className="text-[#52525B]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Dashboard</h1>
          <p className="text-[#52525B] mt-1">Welcome back! Here's what's happening with your platform.</p>
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
                {period}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Cars"
          value={stats.totalCars}
          icon={Car}
          trend={{ isPositive: true, value: 12 }}
        />
        <StatsCard
          title="Active Bookings"
          value={stats.activeBookings}
          icon={Calendar}
          trend={{ isPositive: true, value: 8 }}
          color="#10B981"
          bgColor="#DCFCE7"
        />
        <StatsCard
          title="Pending Submissions"
          value={stats.pendingSubmissions}
          icon={Clock}
          trend={{ isPositive: false, value: 2 }}
          color="#F59E0B"
          bgColor="#FEF3C7"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ isPositive: true, value: 23 }}
          color="#8B5CF6"
          bgColor="#EDE9FE"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-[#A1A1AA] text-sm">Total Users</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.totalUsers}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600">+156 this month</span>
            </div>
          </div>
          <Users className="w-10 h-10 text-[#D97706] opacity-50" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-[#A1A1AA] text-sm">Car Owners</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.carOwners}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600">+8 new this month</span>
            </div>
          </div>
          <Car className="w-10 h-10 text-[#10B981] opacity-50" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-[#A1A1AA] text-sm">Average Rating</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.averageRating} ⭐</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-green-600">Excellent feedback</span>
            </div>
          </div>
          <CheckCircle className="w-10 h-10 text-[#10B981] opacity-50" />
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Revenue Overview</h2>
            <select className="text-sm border border-[#E4E4E7] rounded-lg px-2 py-1 bg-white">
              <option>Last 4 weeks</option>
              <option>Last 3 months</option>
              <option>Last year</option>
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
              <YAxis stroke="#A1A1AA" />
              <Tooltip 
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
              <span className="text-[#52525B]">Revenue ($)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <span className="text-[#52525B]">Bookings</span>
            </div>
          </div>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Monthly Trends</h2>
            <Button variant="ghost" size="sm">View Details →</Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
              <XAxis dataKey="month" stroke="#A1A1AA" />
              <YAxis yAxisId="left" stroke="#A1A1AA" />
              <YAxis yAxisId="right" orientation="right" stroke="#A1A1AA" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="bookings" fill="#D97706" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="right" dataKey="revenue" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Submissions - Priority for admin */}
      <Card>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D97706]" />
              Pending Car Submissions
              {stats.pendingSubmissions > 0 && (
                <span className="bg-[#D97706] text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingSubmissions} need review
                </span>
              )}
            </h2>
            <p className="text-sm text-[#52525B] mt-1">Review and approve new car listings from owners</p>
          </div>
          <Link to="/admin/submissions">
            <Button variant="secondary" iconLeft={<Eye className="w-4 h-4" />}>
              View All Submissions
            </Button>
          </Link>
        </div>
        <RecentSubmissionsTable submissions={recentSubmissions} />
      </Card>

      {/* Recent Bookings */}
      <Card>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D97706]" />
              Recent Bookings
            </h2>
            <p className="text-sm text-[#52525B] mt-1">Latest rental activities on the platform</p>
          </div>
          <Link to="/admin/bookings">
            <Button variant="ghost">View All Bookings →</Button>
          </Link>
        </div>
        <RecentBookingsTable bookings={recentBookings} />
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link to="/admin/submissions">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Clock className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">Review Submissions</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.pendingSubmissions} pending</p>
          </Card>
        </Link>
        
        <Link to="/admin/cars">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Car className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">Manage Cars</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.totalCars} total listings</p>
          </Card>
        </Link>
        
        <Link to="/admin/owners">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Users className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">Car Owners</h3>
            <p className="text-xs text-[#A1A1AA]">{stats.carOwners} registered</p>
          </Card>
        </Link>
        
        <Link to="/admin/reports">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <TrendingUp className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold mb-1">View Reports</h3>
            <p className="text-xs text-[#A1A1AA]">Analytics & insights</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
