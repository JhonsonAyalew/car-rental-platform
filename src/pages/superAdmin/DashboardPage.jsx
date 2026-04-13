import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // ← ADD THIS LINE
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Users, Car, DollarSign, Calendar, TrendingUp, Shield,
  Download, RefreshCw, Eye, AlertCircle, CheckCircle, Clock, Settings  // ← Added Settings here
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setTimeout(() => {
      setStats({
        totalUsers: 2840,
        totalCarOwners: 156,
        totalAdmins: 8,
        totalCars: 1240,
        activeBookings: 342,
        totalRevenue: 284500,
        platformFee: 42750,
        monthlyGrowth: 23,
        avgRating: 4.8
      });

      setRevenueData([
        { month: 'Jan', revenue: 18500, bookings: 145 },
        { month: 'Feb', revenue: 21200, bookings: 168 },
        { month: 'Mar', revenue: 24800, bookings: 192 },
        { month: 'Apr', revenue: 23500, bookings: 185 },
        { month: 'May', revenue: 28900, bookings: 223 },
        { month: 'Jun', revenue: 34200, bookings: 267 }
      ]);

      setUserGrowth([
        { month: 'Jan', customers: 1250, owners: 89 },
        { month: 'Feb', customers: 1420, owners: 102 },
        { month: 'Mar', customers: 1680, owners: 118 },
        { month: 'Apr', customers: 1890, owners: 132 },
        { month: 'May', customers: 2210, owners: 148 },
        { month: 'Jun', customers: 2680, owners: 156 }
      ]);

      setRecentActivities([
        { id: 1, type: 'user', action: 'New user registered', user: 'john@example.com', time: '5 minutes ago', status: 'success' },
        { id: 2, type: 'car', action: 'New car listing', user: 'Tesla Model 3', time: '15 minutes ago', status: 'pending' },
        { id: 3, type: 'booking', action: 'New booking', user: 'Booking #BK-1001', time: '1 hour ago', status: 'success' },
        { id: 4, type: 'admin', action: 'Admin added', user: 'newadmin@example.com', time: '2 hours ago', status: 'info' },
        { id: 5, type: 'payment', action: 'Payment received', user: '$1,245.00', time: '3 hours ago', status: 'success' }
      ]);

      setLoading(false);
    }, 1000);
  };

  const COLORS = ['#D97706', '#10B981', '#3B82F6', '#8B5CF6'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Super Admin Dashboard</h1>
          <p className="text-[#52525B] mt-1">Platform-wide analytics and management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            Export Report
          </Button>
          <Button variant="ghost" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={fetchDashboardData}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#A1A1AA] text-sm">Total Users</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{stats.monthlyGrowth}% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center">
              <Users className="w-6 h-6 text-[#D97706]" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] to-[#FEF3C7]" />
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#A1A1AA] text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-[#52525B] mt-2">Platform fee: ${stats.platformFee.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#A1A1AA] text-sm">Active Bookings</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stats.activeBookings}</p>
              <p className="text-xs text-[#52525B] mt-2">Total cars: {stats.totalCars}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#A1A1AA] text-sm">Platform Rating</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stats.avgRating} ⭐</p>
              <p className="text-xs text-[#52525B] mt-2">Based on all reviews</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#D97706]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Second Row Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        <Card>
          <p className="text-[#A1A1AA] text-sm mb-2">Car Owners</p>
          <p className="text-3xl font-bold text-[#1A1A1A]">{stats.totalCarOwners}</p>
          <div className="mt-2 h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
            <div className="h-full bg-[#D97706] rounded-full" style={{ width: '68%' }} />
          </div>
          <p className="text-xs text-[#52525B] mt-2">68% of total users</p>
        </Card>

        <Card>
          <p className="text-[#A1A1AA] text-sm mb-2">Admin Staff</p>
          <p className="text-3xl font-bold text-[#1A1A1A]">{stats.totalAdmins}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="approved">5 Active</Badge>
            <Badge variant="pending">3 Pending</Badge>
          </div>
        </Card>

        <Card>
          <p className="text-[#A1A1AA] text-sm mb-2">Monthly Growth</p>
          <p className="text-3xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
          <p className="text-xs text-[#52525B] mt-2">Compared to last month</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <select className="text-sm border border-[#E4E4E7] rounded-lg px-2 py-1">
              <option>Last 6 months</option>
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
              <XAxis dataKey="month" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E4E4E7', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#D97706" fillOpacity={1} fill="url(#colorRevenue)" />
              <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">User Growth</h2>
            <Legend />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
              <XAxis dataKey="month" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E4E4E7', borderRadius: '8px' }} />
              <Bar dataKey="customers" fill="#D97706" radius={[8, 8, 0, 0]} />
              <Bar dataKey="owners" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Platform Health */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Platform Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9F8F6] transition">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-[#A1A1AA]">{activity.user}</p>
                </div>
                <p className="text-xs text-[#A1A1AA]">{activity.time}</p>
                <Eye className="w-4 h-4 text-[#A1A1AA] cursor-pointer hover:text-[#D97706]" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Platform Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>System Uptime</span>
                <span className="text-green-600">99.98%</span>
              </div>
              <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '99.98%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>API Response Time</span>
                <span className="text-green-600">245ms</span>
              </div>
              <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Storage Usage</span>
                <span className="text-yellow-600">68%</span>
              </div>
              <div className="h-2 bg-[#F3F2EE] rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
            <div className="pt-4 border-t border-[#E4E4E7]">
              <div className="flex items-center justify-between text-sm">
                <span>Active Sessions</span>
                <span className="font-medium">1,284</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Pending Tasks</span>
                <span className="text-yellow-600">12</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link to="/super-admin/admins">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Shield className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold">Manage Admins</h3>
            <p className="text-xs text-[#A1A1AA]">Add or remove admins</p>
          </Card>
        </Link>
        
        <Link to="/super-admin/users">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Users className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold">All Users</h3>
            <p className="text-xs text-[#A1A1AA]">View all platform users</p>
          </Card>
        </Link>
        
        <Link to="/super-admin/analytics">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <TrendingUp className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-xs text-[#A1A1AA]">Detailed platform analytics</p>
          </Card>
        </Link>
        
        <Link to="/super-admin/settings">
          <Card className="text-center hover:shadow-medium transition cursor-pointer group">
            <Settings className="w-10 h-10 text-[#D97706] mx-auto mb-2 group-hover:scale-110 transition" />
            <h3 className="font-semibold">Platform Settings</h3>
            <p className="text-xs text-[#A1A1AA]">Configure platform</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
