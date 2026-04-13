import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { 
  HardHat,
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Fuel, 
  Settings,
  Gauge,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  ArrowLeft,
  Download,
  Share2,
  Truck,
  Wrench,
  Package,
  Factory
} from 'lucide-react';

const SubmissionDetailPage = () => {
  const { t } = useTranslation('submissionDetail');
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call - Equipment data for Ethiopian market
    setTimeout(() => {
      const mockSubmission = {
        id: id,
        title: 'CAT 320 Excavator',
        brand: 'Caterpillar',
        model: '320',
        year: 2022,
        color: 'Yellow',
        equipmentType: 'Excavator',
        attachment: 'Shovel',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        operatingWeight: '20 tons',
        enginePower: '150 HP',
        operatingHours: 3200,
        features: ['Air Conditioning', 'GPS Tracking', 'Backup Camera', 'ROPS Certified', 'LED Work Lights', 'Auxiliary Hydraulics'],
        pricePerDay: 8500,
        pricePerWeek: 50000,
        pricePerMonth: 180000,
        pricePerHour: 1200,
        securityDeposit: 50000,
        lateFee: 500,
        region: 'Addis Ababa',
        city: 'Addis Ababa',
        subcity: 'Bole',
        woreda: 'Woreda 03',
        location: 'Bole Medhanialem, near the airport',
        pickupInstructions: 'Equipment located at Bole Industrial Zone. Call 30 minutes before pickup. Bring valid ID and operator license.',
        contactPhone: '+251 911 234567',
        contactName: 'Abebe Bekele',
        description: 'Well-maintained CAT 320 excavator perfect for construction sites, road building, and excavation projects. Regular service every 250 hours. Comes with hydraulic quick coupler and two buckets (shovel and hammer attachment available on request).',
        status: 'approved',
        submittedAt: '2024-03-15T10:30:00Z',
        reviewedAt: '2024-03-18T14:20:00Z',
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_0udB0zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoib9_LKYurH0W8IAXevjt0rNAr1nvf8BZMyFNYiyFg&s=10'
        ],
        views: 345,
        bookings: 8,
        earnings: 168500,
        adminNotes: 'Excellent condition with low operating hours. All documentation verified. Approved for immediate listing.',
        operatorAvailable: true,
        deliveryAvailable: true,
        maintenanceIncluded: true
      };
      setSubmission(mockSubmission);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const getStatusConfig = (status) => {
    const configs = {
      approved: { badge: <Badge variant="approved">✓ {t('statusBadges.approved')}</Badge>, icon: <CheckCircle className="w-6 h-6 text-green-500" />, color: 'green' },
      pending: { badge: <Badge variant="pending">⏳ {t('statusBadges.pending')}</Badge>, icon: <Clock className="w-6 h-6 text-yellow-500" />, color: 'yellow' },
      rejected: { badge: <Badge variant="rejected">✗ {t('statusBadges.rejected')}</Badge>, icon: <XCircle className="w-6 h-6 text-red-500" />, color: 'red' },
      review: { badge: <Badge variant="review">📝 {t('statusBadges.review')}</Badge>, icon: <AlertCircle className="w-6 h-6 text-purple-500" />, color: 'purple' }
    };
    return configs[status] || configs.pending;
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  const statusConfig = getStatusConfig(submission.status);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/owner/submissions" className="inline-flex items-center gap-2 text-[#52525B] hover:text-[#D97706] mb-6 transition">
          <ArrowLeft className="w-4 h-4" />
          {t('backButton')}
        </Link>
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{submission.title}</h1>
              <span className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-1 rounded-full">
                {submission.equipmentType}
              </span>
              {statusConfig.badge}
            </div>
            <p className="text-[#52525B]">
              {t('submittedOn')} {new Date(submission.submittedAt).toLocaleDateString()}
              {submission.reviewedAt && ` • ${t('reviewedOn')} ${new Date(submission.reviewedAt).toLocaleDateString()}`}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4 text-[#D97706]" />
              <span className="text-sm text-[#52525B]">{submission.city}, {submission.region}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {submission.status === 'rejected' && (
              <Link to="/owner/submit-equipment">
                <Button iconLeft={<Edit className="w-4 h-4" />}>
                  {t('resubmitButton')}
                </Button>
              </Link>
            )}
            <Button variant="ghost" iconLeft={<Share2 className="w-4 h-4" />}>
              {t('shareButton')}
            </Button>
            <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
              {t('exportButton')}
            </Button>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {submission.images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-xl overflow-hidden aspect-video bg-[#F3F2EE]"
            >
              <img 
                src={img} 
                alt={`Equipment ${idx + 1}`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equipment Details */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <HardHat className="text-[#D97706]" />
                {t('equipmentDetails.title')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.brand')}</span>
                  <span className="font-medium">{submission.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.model')}</span>
                  <span className="font-medium">{submission.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.year')}</span>
                  <span className="font-medium">{submission.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.color')}</span>
                  <span className="font-medium">{submission.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.equipmentType')}</span>
                  <span className="font-medium">{submission.equipmentType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.attachment')}</span>
                  <span className="font-medium">{submission.attachment}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.transmission')}</span>
                  <span className="font-medium">{submission.transmission}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.fuelType')}</span>
                  <span className="font-medium">{submission.fuelType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.operatingWeight')}</span>
                  <span className="font-medium">{submission.operatingWeight}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.enginePower')}</span>
                  <span className="font-medium">{submission.enginePower}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('equipmentDetails.operatingHours')}</span>
                  <span className="font-medium">{submission.operatingHours.toLocaleString()} hours</span>
                </div>
              </div>
            </Card>
            
            {/* Features */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-[#D97706]" />
                {t('features.title')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {submission.features.map(feature => (
                  <span key={feature} className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </Card>
            
            {/* Description */}
            {submission.description && (
              <Card>
                <h2 className="text-xl font-semibold mb-3">{t('description.title')}</h2>
                <p className="text-[#52525B] leading-relaxed">{submission.description}</p>
              </Card>
            )}
            
            {/* Additional Services */}
            {(submission.operatorAvailable || submission.deliveryAvailable || submission.maintenanceIncluded) && (
              <Card>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Package className="text-[#D97706]" />
                  {t('additionalServices.title')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {submission.operatorAvailable && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      <Users className="w-4 h-4" />
                      {t('additionalServices.operator')}
                    </span>
                  )}
                  {submission.deliveryAvailable && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      <Truck className="w-4 h-4" />
                      {t('additionalServices.delivery')}
                    </span>
                  )}
                  {submission.maintenanceIncluded && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      <Wrench className="w-4 h-4" />
                      {t('additionalServices.maintenance')}
                    </span>
                  )}
                </div>
              </Card>
            )}
            
            {/* Admin Notes */}
            {submission.adminNotes && (
              <Card variant="info" className="bg-blue-50 border-blue-200">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-blue-800">
                  <AlertCircle className="w-5 h-5" />
                  {t('adminNotes.title')}
                </h2>
                <p className="text-blue-700">{submission.adminNotes}</p>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="text-[#D97706]" />
                {t('pricing.title')}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#52525B]">{t('pricing.perHour')}</span>
                  <span className="text-xl font-bold text-[#D97706]">{formatCurrency(submission.pricePerHour)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('pricing.perDay')}</span>
                  <span className="text-2xl font-bold text-[#D97706]">{formatCurrency(submission.pricePerDay)}</span>
                </div>
                {submission.pricePerWeek && (
                  <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('pricing.perWeek')}</span>
                    <span className="font-medium">{formatCurrency(submission.pricePerWeek)}</span>
                  </div>
                )}
                {submission.pricePerMonth && (
                  <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('pricing.perMonth')}</span>
                    <span className="font-medium">{formatCurrency(submission.pricePerMonth)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                  <span className="text-[#52525B]">{t('pricing.securityDeposit')}</span>
                  <span className="font-medium">{formatCurrency(submission.securityDeposit)}</span>
                </div>
                {submission.lateFee && (
                  <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                    <span className="text-[#52525B]">{t('pricing.lateFee')}</span>
                    <span className="font-medium text-red-600">{formatCurrency(submission.lateFee)}</span>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Location Card */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="text-[#D97706]" />
                {t('location.title')}
              </h2>
              <div className="space-y-2">
                <p className="text-[#1A1A1A] font-medium">{submission.city}</p>
                <p className="text-sm text-[#52525B]">{submission.region} {t('location.region')}</p>
                <p className="text-sm text-[#52525B]">{submission.subcity}, {submission.woreda}</p>
                <p className="text-sm text-[#52525B] mt-2">{submission.location}</p>
              </div>
              {submission.pickupInstructions && (
                <div className="mt-3 p-3 bg-[#F3F2EE] rounded-lg">
                  <p className="text-sm text-[#52525B]">
                    <strong>{t('location.pickupInstructions')}:</strong> {submission.pickupInstructions}
                  </p>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-[#E4E4E7]">
                <p className="text-sm font-medium mb-1">{t('location.contactPerson')}</p>
                <p className="text-sm text-[#52525B]">{submission.contactName}</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#52525B]">
                  <span>📞 {submission.contactPhone}</span>
                </div>
              </div>
            </Card>
            
            {/* Stats Card */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">{t('performance.title')}</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#52525B]">{t('performance.profileViews')}</span>
                  <span className="text-2xl font-bold">{submission.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#52525B]">{t('performance.totalBookings')}</span>
                  <span className="text-2xl font-bold">{submission.bookings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#52525B]">{t('performance.totalEarnings')}</span>
                  <span className="text-2xl font-bold text-green-600">{formatCurrency(submission.earnings)}</span>
                </div>
              </div>
            </Card>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {submission.status === 'approved' && (
                <Button className="w-full" size="lg">
                  {t('actions.viewLiveListing')}
                </Button>
              )}
              <Button variant="secondary" className="w-full" size="lg" iconLeft={<Edit className="w-4 h-4" />}>
                {t('actions.editEquipment')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Ethiopian Market Note */}
        <div className="mt-8 p-4 bg-[#FEF3C7] rounded-lg border border-[#FDE68A]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#92400E] text-sm">{t('marketTip.title')}</h4>
              <p className="text-xs text-[#92400E] mt-1">
                {t('marketTip.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailPage;
