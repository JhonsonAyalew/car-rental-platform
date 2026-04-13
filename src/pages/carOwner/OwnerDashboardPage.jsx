import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  HardHat,
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
  ChevronRight,
  Truck,
  Gauge,
  Fuel,
  Wrench,
  Package,
  MapPin
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

// Simple chart placeholder
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
  const { t } = useTranslation('ownerDashboard');
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState('Abebe');
  const [totalEquipment, setTotalEquipment] = useState(16);
  
  // Ethiopian cities list
  const ethiopianCities = [
    'Addis Ababa', 'Adama', 'Bahir Dar', 'Dire Dawa', 'Hawassa',
    'Mekelle', 'Gondar', 'Jimma', 'Harar', 'Dessie', 'Debre Markos'
  ];
  
  // Equipment types for stats
  const equipmentTypes = {
    excavator: 2,
    loader: 2,
    bulldozer: 1,
    grader: 1,
    crane: 1,
    waterTruck: 2,
    dumpTruck: 3,
    roller: 2,
    pickup: 1,
    transport: 1
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = () => {
    setTimeout(() => {
      setStats({
        totalEquipment: 16,
        approvedEquipment: 14,
        pendingEquipment: 1,
        rejectedEquipment: 1,
        totalEarnings: 284500,
        monthlyEarnings: 45200,
        totalBookings: 48,
        totalViews: 2450,
        averageRating: 4.8,
        completionRate: 96,
        activeRentals: 6
      });
      
      setEarningsData([8500, 10200, 12800, 15600, 18200, 21000]);
      
      setRecentActivity([
        { id: 1, type: 'booking', message: 'New booking for CAT 320 Excavator', customer: 'Tekle Construction', time: '2 hours ago', status: 'confirmed', amount: 42500, location: 'Addis Ababa' },
        { id: 2, type: 'review', message: '5-star review received for Komatsu D65 Bulldozer', customer: 'Mesfin Engineering', time: 'Yesterday', status: 'positive' },
        { id: 3, type: 'submission', message: 'Liebherr LTM 1050 Crane approved', time: '2 days ago', status: 'approved' },
        { id: 4, type: 'payment', message: 'Payment received for Water Bowser rental', customer: 'Hawassa Construction', time: '3 days ago', status: 'success', amount: 15200 },
        { id: 5, type: 'inquiry', message: 'Inquiry about CAT 950 Wheel Loader', customer: 'Adama Building PLC', time: '4 days ago', status: 'pending' },
        { id: 6, type: 'booking', message: 'Extension request for Sinotruk HOWO 371', customer: 'Dire Dawa Transport', time: '5 days ago', status: 'pending', amount: 4800 }
      ]);
      
      setLoading(false);
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  const mainStats = [
    { icon: HardHat, label: t('stats.totalEquipment'), value: stats.totalEquipment, change: '+3', color: '#D97706', bgColor: '#FEF3C7' },
    { icon: DollarSign, label: t('stats.totalEarnings'), value: `ETB ${(stats.totalEarnings / 1000).toFixed(0)}k`, change: '+18%', color: '#10B981', bgColor: '#DCFCE7' },
    { icon: Calendar, label: t('stats.totalBookings'), value: stats.totalBookings, change: '+12', color: '#3B82F6', bgColor: '#DBEAFE' },
    { icon: Eye, label: t('stats.profileViews'), value: stats.totalViews, change: '+23%', color: '#8B5CF6', bgColor: '#EDE9FE' },
  ];
  
  const statusCards = [
    { label: t('statusCards.pendingApproval'), value: stats.pendingEquipment, icon: Clock, color: 'yellow', link: '/owner/submissions?filter=pending' },
    { label: t('statusCards.rejected'), value: stats.rejectedEquipment, icon: AlertCircle, color: 'red', link: '/owner/submissions?filter=rejected' },
    { label: t('statusCards.averageRating'), value: stats.averageRating, icon: Star, color: 'green', suffix: '/5' },
    { label: t('statusCards.activeRentals'), value: stats.activeRentals, icon: Activity, color: 'blue' },
  ];
  
  return (
    <div className="bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section with Ethiopian flag indicator */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                {t('welcome.greeting')}, {ownerName}! 👋
              </h1>
              <span className="text-2xl">🇪🇹</span>
            </div>
            <p className="text-[#52525B]">{t('welcome.description')}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span className="text-sm">{t('welcome.operatingIn')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                <Truck className="w-4 h-4 text-[#D97706]" />
                <span className="text-sm">{stats.totalEquipment} {t('welcome.equipmentUnits')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                <Users className="w-4 h-4 text-[#D97706]" />
                <span className="text-sm">{stats.totalBookings}+ {t('welcome.activeCustomers')}</span>
              </div>
            </div>
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
                      <span className="text-xs text-[#A1A1AA]">{t('comparisonText.vsLastMonth')}</span>
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
        
        {/* Equipment Type Distribution */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <HardHat className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-semibold">{t('equipmentDistribution.excavators')}</h3>
            </div>
            <p className="text-2xl font-bold">{equipmentTypes.excavator}</p>
            <p className="text-xs text-[#A1A1AA]">{t('equipmentDistribution.availableForRent')}</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-semibold">{t('equipmentDistribution.loaders')}</h3>
            </div>
            <p className="text-2xl font-bold">{equipmentTypes.loader}</p>
            <p className="text-xs text-[#A1A1AA]">{t('equipmentDistribution.availableForRent')}</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-semibold">{t('equipmentDistribution.dumpTrucks')}</h3>
            </div>
            <p className="text-2xl font-bold">{equipmentTypes.dumpTruck}</p>
            <p className="text-xs text-[#A1A1AA]">{t('equipmentDistribution.availableForRent')}</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Fuel className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-semibold">{t('equipmentDistribution.waterTrucks')}</h3>
            </div>
            <p className="text-2xl font-bold">{equipmentTypes.waterTruck}</p>
            <p className="text-xs text-[#A1A1AA]">{t('equipmentDistribution.availableForRent')}</p>
          </Card>
        </div>
        
        {/* Charts and Recent Activity Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Earnings Chart */}
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('earningsChart.title')}</h2>
                <p className="text-sm text-[#A1A1AA]">{t('earningsChart.subtitle')}</p>
              </div>
              <select className="text-sm border border-[#E4E4E7] rounded-lg px-3 py-1.5 bg-white">
                <option>{t('chartPeriods.weekly')}</option>
                <option>{t('chartPeriods.monthly')}</option>
                <option>{t('chartPeriods.yearly')}</option>
              </select>
            </div>
            <SimpleBarChart data={earningsData} />
            <div className="flex justify-between mt-4 pt-4 border-t border-[#E4E4E7]">
              <div>
                <p className="text-xs text-[#A1A1AA]">{t('earningsChart.totalThisPeriod')}</p>
                <p className="text-xl font-bold text-[#1A1A1A]">ETB {earningsData.reduce((a,b)=>a+b,0).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#A1A1AA]">{t('earningsChart.averagePerWeek')}</p>
                <p className="text-xl font-bold text-[#1A1A1A]">ETB {Math.round(earningsData.reduce((a,b)=>a+b,0)/earningsData.length).toLocaleString()}</p>
              </div>
            </div>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">{t('quickActions.title')}</h2>
            <div className="space-y-3">
              <Link to="/owner/submit-equipment">
                <Button className="w-full" iconLeft={<HardHat className="w-4 h-4" />}>
                  {t('quickActions.submitNew')}
                </Button>
              </Link>
              <Link to="/owner/submissions">
                <Button variant="secondary" className="w-full" iconLeft={<List className="w-4 h-4" />}>
                  {t('quickActions.manageListings')}
                </Button>
              </Link>
              <Link to="/owner/analytics">
                <Button variant="ghost" className="w-full" iconLeft={<BarChart3 className="w-4 h-4" />}>
                  {t('quickActions.viewAnalytics')}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        
        {/* Recent Activity Table */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('recentActivity.title')}</h2>
            <Button variant="ghost" size="sm" className="text-[#D97706]">
              {t('recentActivity.viewAll')} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#E4E4E7]">
                <tr>
                  <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">{t('recentActivity.tableHeaders.event')}</th>
                  <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">{t('recentActivity.tableHeaders.customer')}</th>
                  <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">{t('recentActivity.tableHeaders.location')}</th>
                  <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">{t('recentActivity.tableHeaders.status')}</th>
                  <th className="text-left py-3 text-xs font-medium text-[#A1A1AA]">{t('recentActivity.tableHeaders.time')}</th>
                  <th className="text-right py-3 text-xs font-medium text-[#A1A1AA]">{t('recentActivity.tableHeaders.amount')}</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6] transition">
                    <td className="py-3 text-sm text-[#1A1A1A]">{activity.message}</td>
                    <td className="py-3 text-sm text-[#52525B]">{activity.customer || '-'}</td>
                    <td className="py-3 text-sm text-[#52525B]">{activity.location || '-'}</td>
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
                      {activity.amount ? `ETB ${activity.amount.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Pro Tip Banner - Ethiopian Construction Market */}
        <div className="mt-6 p-5 bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7] rounded-xl border border-[#FDE68A]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D97706] flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-1">{t('proTip.title')}</h3>
              <p className="text-sm text-[#52525B]">
                {t('proTip.description')}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-white px-2 py-1 rounded-full">📸 {t('proTip.tips.photos')}</span>
                <span className="text-xs bg-white px-2 py-1 rounded-full">📝 {t('proTip.tips.specs')}</span>
                <span className="text-xs bg-white px-2 py-1 rounded-full">🚚 {t('proTip.tips.delivery')}</span>
                <span className="text-xs bg-white px-2 py-1 rounded-full">👷 {t('proTip.tips.operator')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ethiopian Cities Service Area */}
        <div className="mt-6 p-5 bg-white rounded-xl border border-[#E4E4E7]">
          <h3 className="font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D97706]" />
            {t('serviceArea.title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ethiopianCities.map((city, idx) => (
              <span key={idx} className="px-3 py-1 bg-[#F9F8F6] rounded-full text-sm text-[#52525B]">
                {city}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#A1A1AA] mt-3">
            {t('serviceArea.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
