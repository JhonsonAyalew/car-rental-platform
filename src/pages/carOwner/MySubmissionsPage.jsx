import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Spinner from '../../components/ui/Spinner';
import { 
  HardHat,
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  Gauge,
  Fuel,
  Wrench
} from 'lucide-react';

const MySubmissionsPage = () => {
  const { t } = useTranslation('mySubmissions');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  // Mock data - Equipment submissions for Ethiopian market
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSubmissions = [
        {
          id: '1',
          title: 'CAT 320 Excavator',
          brand: 'Caterpillar',
          model: '320',
          year: 2022,
          pricePerDay: 8500,
          pricePerHour: 1200,
          status: 'approved',
          submittedAt: '2024-03-15T10:30:00Z',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          location: 'Addis Ababa, Ethiopia',
          region: 'Addis Ababa',
          equipmentType: 'Excavator',
          attachment: 'Shovel',
          operatingWeight: '20 tons',
          views: 345,
          bookings: 8,
          hourlyRate: 1200
        },
        {
          id: '2',
          title: 'Sinotruk HOWO 371 Dump Truck',
          brand: 'Sinotruk',
          model: 'HOWO 371',
          year: 2023,
          pricePerDay: 4800,
          pricePerHour: 680,
          status: 'pending',
          submittedAt: '2024-03-20T14:15:00Z',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10',
          location: 'Dire Dawa, Ethiopia',
          region: 'Dire Dawa',
          equipmentType: 'Dump Truck',
          attachment: 'Tipper',
          operatingWeight: '25 tons',
          views: 89,
          bookings: 0,
          hourlyRate: 680
        },
        {
          id: '3',
          title: 'Komatsu D65 Bulldozer',
          brand: 'Komatsu',
          model: 'D65',
          year: 2021,
          pricePerDay: 9000,
          pricePerHour: 1300,
          status: 'rejected',
          submittedAt: '2024-03-10T09:00:00Z',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10',
          location: 'Adama, Ethiopia',
          region: 'Oromia',
          equipmentType: 'Bulldozer',
          attachment: 'Blade',
          operatingWeight: '22 tons',
          views: 156,
          bookings: 0,
          hourlyRate: 1300,
          rejectionReason: 'Please provide clearer photos of the undercarriage and blade condition. Also update the operating hours and service history.'
        },
        {
          id: '4',
          title: 'Water Bowser Manual',
          brand: 'HOWO',
          model: 'Water Bowser',
          year: 2022,
          pricePerDay: 3800,
          pricePerHour: 550,
          status: 'review',
          submittedAt: '2024-03-18T11:45:00Z',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlLeUA0Va6oTjZX28tH3KJkd0AF27Bl7fb2DvBazhYQ&s',
          location: 'Hawassa, Ethiopia',
          region: 'Sidama',
          equipmentType: 'Water Truck',
          attachment: 'Manual Sprinkler',
          operatingWeight: '18 tons',
          views: 67,
          bookings: 0,
          hourlyRate: 550
        },
        {
          id: '5',
          title: 'Liebherr LTM 1050 Crane',
          brand: 'Liebherr',
          model: 'LTM 1050',
          year: 2023,
          pricePerDay: 18000,
          pricePerHour: 2500,
          status: 'approved',
          submittedAt: '2024-03-05T09:00:00Z',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10',
          location: 'Addis Ababa, Ethiopia',
          region: 'Addis Ababa',
          equipmentType: 'Crane',
          attachment: 'Hook',
          operatingWeight: '50 tons',
          views: 423,
          bookings: 3,
          hourlyRate: 2500
        },
        {
          id: '6',
          title: 'CAT 950 Wheel Loader',
          brand: 'Caterpillar',
          model: '950',
          year: 2022,
          pricePerDay: 7200,
          pricePerHour: 1000,
          status: 'pending',
          submittedAt: '2024-03-22T13:00:00Z',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10',
          location: 'Hawassa, Ethiopia',
          region: 'Sidama',
          equipmentType: 'Loader',
          attachment: 'Bucket',
          operatingWeight: '25 tons',
          views: 112,
          bookings: 0,
          hourlyRate: 1000
        }
      ];
      setSubmissions(mockSubmissions);
      setLoading(false);
    }, 1000);
  }, []);
  
  const getStatusBadge = (status) => {
    const badges = {
      approved: <Badge variant="approved">✓ {t('statusBadges.approved')}</Badge>,
      pending: <Badge variant="pending">⏳ {t('statusBadges.pending')}</Badge>,
      rejected: <Badge variant="rejected">✗ {t('statusBadges.rejected')}</Badge>,
      review: <Badge variant="review">📝 {t('statusBadges.review')}</Badge>
    };
    return badges[status] || badges.pending;
  };
  
  const getStatusIcon = (status) => {
    const icons = {
      approved: <CheckCircle className="w-5 h-5 text-green-500" />,
      pending: <Clock className="w-5 h-5 text-yellow-500" />,
      rejected: <XCircle className="w-5 h-5 text-red-500" />,
      review: <AlertCircle className="w-5 h-5 text-purple-500" />
    };
    return icons[status];
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });
  
  const stats = {
    total: submissions.length,
    approved: submissions.filter(s => s.status === 'approved').length,
    pending: submissions.filter(s => s.status === 'pending').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    review: submissions.filter(s => s.status === 'review').length
  };
  
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
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">{t('title')}</h1>
            <span className="text-2xl">🇪🇹</span>
          </div>
          <p className="text-[#52525B]">{t('subtitle')}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card variant="info" className="text-center">
            <HardHat className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
            <p className="text-sm text-[#52525B]">{t('stats.totalEquipment')}</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-green-500">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.approved}</p>
            <p className="text-sm text-[#52525B]">{t('stats.approved')}</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-yellow-500">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.pending}</p>
            <p className="text-sm text-[#52525B]">{t('stats.pending')}</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-purple-500">
            <AlertCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.review}</p>
            <p className="text-sm text-[#52525B]">{t('stats.inReview')}</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-red-500">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.rejected}</p>
            <p className="text-sm text-[#52525B]">{t('stats.rejected')}</p>
          </Card>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { value: 'all', label: t('filterTabs.all'), count: stats.total },
            { value: 'approved', label: t('filterTabs.approved'), count: stats.approved, color: 'green' },
            { value: 'pending', label: t('filterTabs.pending'), count: stats.pending, color: 'yellow' },
            { value: 'review', label: t('filterTabs.inReview'), count: stats.review, color: 'purple' },
            { value: 'rejected', label: t('filterTabs.rejected'), count: stats.rejected, color: 'red' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap
                ${filter === tab.value
                  ? 'bg-[#D97706] text-white shadow-md'
                  : 'bg-white text-[#52525B] hover:bg-[#FEF3C7] border border-[#E4E4E7]'
                }
              `}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs
                  ${filter === tab.value ? 'bg-white/20' : 'bg-[#F3F2EE]'}
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Submissions List */}
        {filteredSubmissions.length === 0 ? (
          <EmptyState
            icon={<HardHat className="w-16 h-16" />}
            title={t('emptyState.title')}
            description={t('emptyState.description')}
            action={
              <Link to="/owner/submit-equipment">
                <Button>{t('emptyState.actionButton')}</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="interactive" className="overflow-hidden hover:shadow-medium transition-all">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image */}
                      <div className="md:w-48 h-48 rounded-lg overflow-hidden bg-[#F3F2EE]">
                        <img 
                          src={submission.image} 
                          alt={submission.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                          }}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                                {submission.title}
                              </h3>
                              <span className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full">
                                {submission.equipmentType}
                              </span>
                            </div>
                            <p className="text-sm text-[#52525B]">
                              {submission.year} • {submission.brand} {submission.model} • {submission.operatingWeight}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-[#52525B] mt-1">
                              <Wrench className="w-3 h-3" />
                              <span>{submission.attachment}</span>
                            </div>
                          </div>
                          {getStatusBadge(submission.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatCurrency(submission.pricePerDay)}{t('priceDisplay.perDay')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <Clock className="w-4 h-4" />
                            <span>{formatCurrency(submission.pricePerHour)}{t('priceDisplay.perHour')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <MapPin className="w-4 h-4" />
                            <span>{submission.location.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <Eye className="w-4 h-4" />
                            <span>{submission.views} {t('metrics.profileViews')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <Truck className="w-4 h-4" />
                            <span>{submission.bookings} {t('metrics.bookings')}</span>
                          </div>
                        </div>
                        
                        {submission.status === 'rejected' && submission.rejectionReason && (
                          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700 flex items-start gap-2">
                              <XCircle className="w-4 h-4 mt-0.5" />
                              <span><strong>{t('rejectionReason.label')}:</strong> {submission.rejectionReason}</span>
                            </p>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Link to={`/owner/submission/${submission.id}`}>
                            <Button variant="ghost" size="sm" iconLeft={<Eye className="w-4 h-4" />}>
                              {t('cardLabels.viewDetails')}
                            </Button>
                          </Link>
                          {submission.status === 'rejected' && (
                            <Link to="/owner/submit-equipment">
                              <Button size="sm" iconLeft={<Edit className="w-4 h-4" />}>
                                {t('cardLabels.resubmit')}
                              </Button>
                            </Link>
                          )}
                          {submission.status === 'approved' && (
                            <Link to={`/equipment/${submission.id}`}>
                              <Button size="sm" variant="secondary" iconLeft={<Eye className="w-4 h-4" />}>
                                {t('cardLabels.viewListing')}
                              </Button>
                            </Link>
                          )}
                          <Button variant="ghost" size="sm" iconLeft={<Trash2 className="w-4 h-4" />} className="text-red-600 hover:bg-red-50">
                            {t('cardLabels.delete')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link to="/owner/submit-equipment">
            <Button size="lg" iconLeft={<HardHat className="w-5 h-5" />}>
              {t('ctaButton.text')}
            </Button>
          </Link>
        </div>
        
        {/* Ethiopian Market Tips */}
        <div className="mt-8 p-4 bg-[#FEF3C7] rounded-lg border border-[#FDE68A]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#92400E] text-sm">{t('tipsBox.title')}</h4>
              <p className="text-xs text-[#92400E] mt-1">
                {t('tipsBox.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySubmissionsPage;
