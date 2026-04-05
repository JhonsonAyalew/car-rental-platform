import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Eye,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  Users,
  BarChart3,
  List,
  Activity,
  ChevronRight
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

// Simple chart placeholder (you can integrate a real chart library later)
const SimpleBarChart = ({ data }) => (
  <div className="flex items-end gap-2 h-32 mt-4">
    {data.map((value, idx) => (
      <div key={idx} className="flex-1 flex flex-col items-center">
        <div 
          className="w-full bg-[#D97706] rounded-t transition-all duration-500"
          style={{ height: `${(value / Math.max(...data)) * 100}%` }}
        />
        <span className="text-xs text-[#A1A1AA] mt-1">Week {idx+1}</span>
      </div>
    ))}
  </div>
);

const OwnerDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalCars: 5,
        approvedCars: 3,
        pendingCars: 1,
        rejectedCars: 1,
        totalEarnings: 1245,
        monthlyEarnings: 420,
        totalBookings: 12,
        totalViews: 856,
        averageRating: 4.8,
        completionRate: 94
      });
      
      setEarningsData([180, 220, 300, 420, 380, 450]);
      
      setRecentActivity([
        { id: 1, type: 'booking', message: 'New booking for Toyota Camry', time: '2 hours ago', status: 'confirmed', amount: 245 },
        { id: 2, type: 'review', message: '5-star review received for Tesla Model 3', time: 'Yesterday', status: 'positive' },
        { id: 3, type: 'submission', message: 'BMW X5 submission approved', time: '2 days ago', status: 'approved' },
        { id: 4, type: 'payment', message: 'Payment received', time: '3 days ago', status: 'success', amount: 380 },
        { id: 5, type: 'inquiry', message: 'Customer inquiry about Honda CR-V', time: '4 days ago', status: 'pending' }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  const mainStats = [
    { icon: Car, label: 'Active Listings', value: stats.approvedCars, change: '+2', color: '#D97706', bgColor: '#FEF3C7' },
    { icon: DollarSign, label: 'Total Earnings', value: `$${stats.totalEarnings}`, change: '+12%', color: '#10B981', bgColor: '#DCFCE7' },
    { icon: Calendar, label: 'Bookings', value: stats.totalBookings, change: '+8', color: '#3B82F6', bgColor: '#DBEAFE' },
    { icon: Eye, label: 'Profile Views', value: stats.totalViews, change: '+23%', color: '#8B5CF6', bgColor: '#EDE9FE' },
  ];
  
  const statusCards = [
    { label: 'Pending Approval', value: stats.pendingCars, icon: Clock, color: 'yellow', link: '/owner/submissions?filter=pending' },
    { label: 'Rejected', value: stats.rejectedCars, icon: AlertCircle, color: 'red', link: '/owner/submissions?filter=rejected' },
    { label: 'Average Rating', value: stats.averageRating, icon: Star, color: 'green', suffix: '/5' },
    { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: Activity, color: 'blue' },
  ];
  
  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Welcome back, John! 👋</h1>
          <p className="text-[#52525B] mt-1">Here's what's happening with your car rental business</p>
        </motion.div>
      </div>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="info" className="relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#A1A1AA] text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">{stat.change}</span>
                    <span className="text-xs text-[#A1A1AA]">vs last month</span>
                  </div>
                </div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon style={{ color: stat.color }} className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statusCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
          >
            {card.link ? (
              <Link to={card.link}>
                <Card className="hover:shadow-medium transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#A1A1AA] text-xs mb-1">{card.label}</p>
                      <p className="text-xl font-bold text-[#1A1A1A]">
                        {card.value}{card.suffix || ''}
                      </p>
                    </div>
                    <card.icon className={`w-8 h-8 text-${card.color}-500 opacity-70 group-hover:opacity-100 transition`} />
                  </div>
                </Card>
              </Link>
            ) : (
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A1A1AA] text-xs mb-1">{card.label}</p>
                    <p className="text-xl font-bold text-[#1A1A1A]">
                      {card.value}{card.suffix || ''}
                    </p>
                  </div>
                  <card.icon className={`w-8 h-8 text-${card.color}-500 opacity-70`} />
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Charts and Recent Activity Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Earnings Overview</h2>
              <p className="text-sm text-[#A1A1AA]">Last 6 weeks</p>
            </div>
            <select className="text-sm border border-[#E4E4E7] rounded-lg px-3 py-1.5 bg-white">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <SimpleBarChart data={earningsData} />
          <div className="flex justify-between mt-4 pt-4 border-t border-[#E4E4E7]">
            <div>
              <p className="text-xs text-[#A1A1AA]">Total this period</p>
              <p className="text-xl font-bold text-[#1A1A1A]">${earningsData.reduce((a,b)=>a+b,0)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#A1A1AA]">Average per week</p>
              <p className="text-xl font-bold text-[#1A1A1A]">${Math.round(earningsData.reduce((a,b)=>a+b,0)/earningsData.length)}</p>
            </div>
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/owner/submit-car">
              <Button className="w-full" iconLeft={<Car className="w-4 h-4" />}>
                Submit New Car
              </Button>
            </Link>
            <Link to="/owner/submissions">
              <Button variant="secondary" className="w-full" iconLeft={<List className="w-4 h-4" />}>
                Manage Listings
              </Button>
            </Link>
            <Button variant="ghost" className="w-full" iconLeft={<BarChart3 className="w-4 h-4" />}>
              View Full Analytics
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Recent Activity Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-[#D97706]">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E4E4E7]">
              <tr>
                <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">Event</th>
                <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">Status</th>
                <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">Time</th>
                <th className="text-right py-3 text-xs font-medium text-[#A1A1AA]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6] transition">
                  <td className="py-3 text-sm text-[#1A1A1A]">{activity.message}</td>
                  <td className="py-3">
                    <Badge variant={
                      activity.status === 'confirmed' || activity.status === 'success' ? 'approved' :
                      activity.status === 'pending' ? 'pending' : 'approved'
                    }>
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-sm text-[#52525B]">{activity.time}</td>
                  <td className="py-3 text-right text-sm font-medium text-[#1A1A1A]">
                    {activity.amount ? `$${activity.amount}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Pro Tip Banner */}
      <div className="mt-6 p-5 bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7] rounded-xl border border-[#FDE68A]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D97706] flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1A1A1A] mb-1">Pro Tip: Boost Your Bookings</h3>
            <p className="text-sm text-[#52525B]">
              Cars with professional photos and detailed descriptions get up to 3x more bookings. 
              Take clear photos in good lighting and highlight unique features to stand out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
