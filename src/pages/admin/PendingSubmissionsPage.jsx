import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  DollarSign,
  Car,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  HardHat,
  Truck,
  Timer,
  Fuel,
  Settings,
  Weight,
  Gauge
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const PendingSubmissionsPage = () => {
  const { t } = useTranslation('pendingSubmissions');
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedId, setExpandedId] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewAction, setReviewAction] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
    setLoading(true);
    setTimeout(() => {
      const mockSubmissions = [
        {
          id: 'SUB-001',
          equipmentName: 'CAT 320 Excavator with Hammer',
          equipmentType: 'Excavator',
          brand: 'Caterpillar',
          model: '320',
          year: 2022,
          color: 'Yellow',
          transmission: 'Hydrostatic',
          fuelType: 'Diesel',
          operatingWeight: '22,000 kg',
          enginePower: '160 HP',
          mileage: 2450,
          pricePerDay: 450,
          pricePerHour: 65,
          pricePerWeek: 2500,
          securityDeposit: 1500,
          location: 'Addis Ababa, Ethiopia',
          description: 'Heavy duty excavator with hydraulic hammer attachment. Perfect for demolition and rock breaking. Well maintained, low hours.',
          images: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
          ],
          features: ['Hydraulic Hammer', 'AC Cabin', 'LED Lights', 'GPS Tracking', 'Rear Camera'],
          attachments: ['Hydraulic Hammer', 'Shovel Bucket'],
          owner: {
            id: 'OWN-001',
            name: 'David Wilson',
            email: 'david@example.com',
            phone: '+251 911 123 456',
            businessName: 'Wilson Heavy Equipment',
            joinedDate: '2023-06-15',
            totalEquipment: 5,
            rating: 4.8,
            verified: true
          },
          submittedAt: '2024-01-22T10:30:00Z',
          status: 'pending',
          priority: 'high',
          hourlyRental: true
        },
        {
          id: 'SUB-002',
          equipmentName: 'Komatsu WA500 Loader',
          equipmentType: 'Loader',
          brand: 'Komatsu',
          model: 'WA500',
          year: 2023,
          color: 'Yellow',
          transmission: 'Automatic',
          fuelType: 'Diesel',
          operatingWeight: '28,000 kg',
          enginePower: '280 HP',
          bucketCapacity: '4.5 m³',
          pricePerDay: 350,
          pricePerHour: 50,
          pricePerWeek: 1900,
          securityDeposit: 1200,
          location: 'Dire Dawa, Ethiopia',
          description: 'Wheel loader with high lift capacity. Great for loading trucks and material handling.',
          images: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
            'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=400'
          ],
          features: ['AC Cabin', 'Radio', 'LED Lights', 'Backup Alarm', 'Quick Coupler'],
          attachments: ['General Purpose Bucket', 'Fork Attachment'],
          owner: {
            id: 'OWN-002',
            name: 'Lisa Anderson',
            email: 'lisa@example.com',
            phone: '+251 911 234 567',
            businessName: 'Anderson Heavy Machinery',
            joinedDate: '2023-08-20',
            totalEquipment: 3,
            rating: 4.9,
            verified: true
          },
          submittedAt: '2024-01-21T14:15:00Z',
          status: 'pending',
          priority: 'medium',
          hourlyRental: true
        },
        {
          id: 'SUB-003',
          equipmentName: 'Sinotruck Howo 6x4 Dump Truck',
          equipmentType: 'Truck',
          brand: 'Sinotruk',
          model: 'Howo 371',
          year: 2023,
          color: 'White',
          transmission: 'Manual',
          fuelType: 'Diesel',
          payload: '25,000 kg',
          enginePower: '371 HP',
          pricePerDay: 280,
          pricePerHour: 40,
          pricePerWeek: 1500,
          securityDeposit: 1000,
          location: 'Adama, Ethiopia',
          description: 'Heavy duty dump truck for construction and mining. Excellent condition, regularly serviced.',
          images: [
            'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400'
          ],
          features: ['AC Cabin', 'Air Suspension', 'GPS', 'Reverse Camera', 'Logbook'],
          attachments: ['Dump Body', 'Tarp Cover'],
          owner: {
            id: 'OWN-003',
            name: 'Tom Harris',
            email: 'tom@example.com',
            phone: '+251 911 345 678',
            businessName: 'Harris Transport',
            joinedDate: '2023-10-10',
            totalEquipment: 8,
            rating: 5.0,
            verified: true
          },
          submittedAt: '2024-01-20T09:45:00Z',
          status: 'pending',
          priority: 'high',
          hourlyRental: false
        },
        {
          id: 'SUB-004',
          equipmentName: 'Bulldozer D6R',
          equipmentType: 'Bulldozer',
          brand: 'Caterpillar',
          model: 'D6R',
          year: 2022,
          color: 'Yellow',
          transmission: 'Hydrostatic',
          fuelType: 'Diesel',
          operatingWeight: '20,000 kg',
          enginePower: '185 HP',
          bladeCapacity: '3.5 m³',
          pricePerDay: 520,
          pricePerHour: 75,
          pricePerWeek: 2900,
          securityDeposit: 1800,
          location: 'Hawassa, Ethiopia',
          description: 'Track-type tractor with GPS grading system. Perfect for land clearing and grading.',
          images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'
          ],
          features: ['GPS Grading', 'AC Cabin', 'Ripper', 'LED Lights', 'Fire Suppression'],
          attachments: ['S-Blade', 'Ripper', 'Winch'],
          owner: {
            id: 'OWN-004',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+251 911 456 789',
            businessName: 'Johnson Earthmoving',
            joinedDate: '2023-11-05',
            totalEquipment: 4,
            rating: 4.7,
            verified: true
          },
          submittedAt: '2024-01-19T16:20:00Z',
          status: 'review',
          priority: 'medium',
          hourlyRental: true
        },
        {
          id: 'SUB-005',
          equipmentName: 'Crane 50 Ton Mobile',
          equipmentType: 'Crane',
          brand: 'XCMG',
          model: 'QY50K',
          year: 2023,
          color: 'Yellow',
          transmission: 'Automatic',
          fuelType: 'Diesel',
          maxLift: '50,000 kg',
          boomLength: '42 m',
          pricePerDay: 800,
          pricePerHour: 120,
          pricePerWeek: 4500,
          securityDeposit: 3000,
          location: 'Bahir Dar, Ethiopia',
          description: 'Mobile hydraulic crane with telescopic boom. Includes certified operator if needed.',
          images: [
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400'
          ],
          features: ['Telescopic Boom', 'Outriggers', 'Load Moment Indicator', 'Operator Cabin', 'Stabilizers'],
          attachments: ['Hook Block', 'Jib Attachment'],
          owner: {
            id: 'OWN-005',
            name: 'Mike Brown',
            email: 'mike@example.com',
            phone: '+251 911 567 890',
            businessName: 'Brown Crane Services',
            joinedDate: '2023-09-15',
            totalEquipment: 2,
            rating: 4.9,
            verified: true
          },
          submittedAt: '2024-01-18T11:00:00Z',
          status: 'pending',
          priority: 'high',
          hourlyRental: true
        },
        {
          id: 'SUB-006',
          equipmentName: 'Water Truck - Automatic',
          equipmentType: 'Water Truck',
          brand: 'FAW',
          model: 'Water Bowser',
          year: 2023,
          color: 'Blue',
          transmission: 'Automatic',
          fuelType: 'Diesel',
          capacity: '12,000 L',
          pumpCapacity: '800 L/min',
          pricePerDay: 220,
          pricePerHour: 35,
          pricePerWeek: 1200,
          securityDeposit: 800,
          location: 'Mekelle, Ethiopia',
          description: 'Water spray truck for dust suppression and construction sites. Automatic transmission for easy operation.',
          images: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400'
          ],
          features: ['Water Cannon', 'Rear Spray', 'Side Spray', 'Water Pump', 'Hose Reel'],
          attachments: ['Water Cannon', 'Spray Nozzles'],
          owner: {
            id: 'OWN-006',
            name: 'Emily Davis',
            email: 'emily@example.com',
            phone: '+251 911 678 901',
            businessName: 'Davis Water Services',
            joinedDate: '2023-12-01',
            totalEquipment: 3,
            rating: 4.6,
            verified: false
          },
          submittedAt: '2024-01-17T14:30:00Z',
          status: 'pending',
          priority: 'low',
          hourlyRental: true
        }
      ];
      setSubmissions(mockSubmissions);
      setFilteredSubmissions(mockSubmissions);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...submissions];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }
    
    if (equipmentTypeFilter !== 'all') {
      filtered = filtered.filter(s => s.equipmentType === equipmentTypeFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.equipmentType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      default:
        break;
    }
    
    setFilteredSubmissions(filtered);
  }, [searchTerm, statusFilter, equipmentTypeFilter, sortBy, submissions]);

  const handleReview = (submission, action) => {
    setSelectedSubmission(submission);
    setReviewAction(action);
    setShowReviewModal(true);
    setReviewNotes('');
  };

  const submitReview = async () => {
    if (!reviewNotes && reviewAction === 'reject') {
      toast.error(t('messages.rejectReasonRequired'));
      return;
    }
    
    toast.loading(t('messages.processing'), { id: 'review' });
    
    setTimeout(() => {
      const updatedSubmissions = submissions.map(sub => 
        sub.id === selectedSubmission.id 
          ? { ...sub, status: reviewAction === 'approve' ? 'approved' : 'rejected' }
          : sub
      );
      setSubmissions(updatedSubmissions);
      
      toast.success(reviewAction === 'approve' ? t('messages.approved') : t('messages.rejected'), { id: 'review' });
      
      setShowReviewModal(false);
      setSelectedSubmission(null);
      setReviewNotes('');
    }, 1500);
  };

  const getEquipmentTypeIcon = (type) => {
    const icons = {
      'Excavator': <HardHat className="w-4 h-4" />,
      'Loader': <Truck className="w-4 h-4" />,
      'Bulldozer': <HardHat className="w-4 h-4" />,
      'Crane': <Truck className="w-4 h-4" />,
      'Truck': <Truck className="w-4 h-4" />,
      'Water Truck': <Truck className="w-4 h-4" />
    };
    return icons[type] || <HardHat className="w-4 h-4" />;
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'high') return <Badge variant="pending">⚠️ {t('priority.high')}</Badge>;
    if (priority === 'medium') return <Badge variant="review">📝 {t('priority.medium')}</Badge>;
    return <Badge variant="completed">✓ {t('priority.low')}</Badge>;
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return <Badge variant="pending">⏳ {t('status.pending')}</Badge>;
    if (status === 'approved') return <Badge variant="approved">✓ {t('status.approved')}</Badge>;
    if (status === 'rejected') return <Badge variant="rejected">✗ {t('status.rejected')}</Badge>;
    return <Badge variant="review">📝 {t('status.review')}</Badge>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const equipmentTypes = ['Excavator', 'Loader', 'Bulldozer', 'Crane', 'Truck', 'Water Truck'];
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const reviewCount = submissions.filter(s => s.status === 'review').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

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
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{t('submissions.title')}</h1>
          <p className="text-[#52525B] mt-1">{t('submissions.subtitle')}</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={fetchSubmissions}>
            {t('buttons.refresh')}
          </Button>
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            {t('buttons.export')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{pendingCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> {t('stats.pendingReview')}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{reviewCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" /> {t('stats.inReview')}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3" /> {t('stats.approved')}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <XCircle className="w-3 h-3" /> {t('stats.rejected')}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder={t('filters.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          
          <select
            value={equipmentTypeFilter}
            onChange={(e) => setEquipmentTypeFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">{t('filters.allEquipmentTypes')}</option>
            {equipmentTypes.map(type => (
              <option key={type} value={type}>{t(`equipmentTypes.${type.replace(' ', '')}`)}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">{t('filters.allStatus')}</option>
            <option value="pending">{t('filters.statusPending')}</option>
            <option value="review">{t('filters.statusInReview')}</option>
            <option value="approved">{t('filters.statusApproved')}</option>
            <option value="rejected">{t('filters.statusRejected')}</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="newest">{t('filters.sortNewest')}</option>
            <option value="oldest">{t('filters.sortOldest')}</option>
            <option value="price-high">{t('filters.sortPriceHigh')}</option>
            <option value="price-low">{t('filters.sortPriceLow')}</option>
          </select>
        </div>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredSubmissions.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-[#D97706] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('emptyState.title')}</h3>
                <p className="text-[#52525B]">{t('emptyState.message')}</p>
              </div>
            </Card>
          ) : (
            filteredSubmissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  {/* Header */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-[#E4E4E7]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          {getEquipmentTypeIcon(submission.equipmentType)}
                          <h2 className="text-lg font-semibold text-[#1A1A1A]">
                            {submission.equipmentName}
                          </h2>
                        </div>
                        <Badge variant="info">{t(`equipmentTypes.${submission.equipmentType.replace(' ', '')}`)}</Badge>
                        {getPriorityBadge(submission.priority)}
                        {getStatusBadge(submission.status)}
                      </div>
                      <p className="text-sm text-[#52525B] mt-1">
                        {t('submissionCard.submitted')} {formatDate(submission.submittedAt)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {submission.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleReview(submission, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                            iconLeft={<CheckCircle className="w-4 h-4" />}
                          >
                            {t('submissionCard.approve')}
                          </Button>
                          <Button
                            onClick={() => handleReview(submission, 'reject')}
                            variant="danger"
                            iconLeft={<XCircle className="w-4 h-4" />}
                          >
                            {t('submissionCard.reject')}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                        iconRight={expandedId === submission.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      >
                        {expandedId === submission.id ? t('submissionCard.showLess') : t('submissionCard.viewDetails')}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Compact Info */}
                  <div className="flex flex-wrap gap-6 pt-4">
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <DollarSign className="w-4 h-4" />
                      <span>${submission.pricePerDay}/{t('submissionCard.day')}</span>
                      {submission.hourlyRental && (
                        <span className="text-xs text-[#D97706]">(${submission.pricePerHour}/{t('submissionCard.hour')})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <Fuel className="w-4 h-4" />
                      <span>{submission.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <Gauge className="w-4 h-4" />
                      <span>{submission.operatingWeight || submission.payload || submission.maxLift}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <User className="w-4 h-4" />
                      <span>{submission.owner.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <MapPin className="w-4 h-4" />
                      <span>{submission.location}</span>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === submission.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-[#E4E4E7]"
                      >
                        <div className="grid lg:grid-cols-3 gap-6">
                          {/* Images */}
                          <div>
                            <h3 className="font-semibold mb-2">{t('expandedDetails.photos')}</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {submission.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Equipment ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Equipment Details */}
                          <div>
                            <h3 className="font-semibold mb-2">{t('expandedDetails.specifications')}</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.brandModel')}:</span>
                                <span>{submission.brand} {submission.model}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.year')}:</span>
                                <span>{submission.year}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.enginePower')}:</span>
                                <span>{submission.enginePower}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.transmission')}:</span>
                                <span>{submission.transmission}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.fuelType')}:</span>
                                <span>{submission.fuelType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.operatingHours')}:</span>
                                <span>{submission.mileage?.toLocaleString()} hrs</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Owner Information */}
                          <div>
                            <h3 className="font-semibold mb-2">{t('expandedDetails.ownerInfo')}</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#52525B]" />
                                <span>{submission.owner.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#52525B]" />
                                <span>{submission.owner.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#52525B]" />
                                <span>{submission.owner.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{submission.owner.rating} ⭐</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <HardHat className="w-4 h-4 text-[#52525B]" />
                                <span>{submission.owner.totalEquipment} {t('expandedDetails.equipmentListed')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">{t('expandedDetails.description')}</h3>
                          <p className="text-sm text-[#52525B]">{submission.description}</p>
                        </div>
                        
                        {/* Features & Attachments */}
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">{t('expandedDetails.featuresAttachments')}</h3>
                          <div className="flex flex-wrap gap-2">
                            {submission.features.map(feature => (
                              <span key={feature} className="px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded text-xs">
                                {feature}
                              </span>
                            ))}
                            {submission.attachments && submission.attachments.map(attachment => (
                              <span key={attachment} className="px-2 py-1 bg-[#DBEAFE] text-[#1E40AF] rounded text-xs">
                                🔧 {attachment}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Pricing */}
                        <div className="mt-4 p-4 bg-[#F9F8F6] rounded-lg">
                          <h3 className="font-semibold mb-2">{t('expandedDetails.pricing')}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#52525B]">{t('expandedDetails.dailyRate')}:</span>
                              <span className="font-medium text-[#D97706]">${submission.pricePerDay}</span>
                            </div>
                            {submission.pricePerHour && (
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">{t('expandedDetails.hourlyRate')}:</span>
                                <span className="font-medium">${submission.pricePerHour}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-[#52525B]">{t('expandedDetails.weeklyRate')}:</span>
                              <span className="font-medium">${submission.pricePerWeek}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#52525B]">{t('expandedDetails.securityDeposit')}:</span>
                              <span className="font-medium">${submission.securityDeposit}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl max-w-lg w-full shadow-strong"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">
                {reviewAction === 'approve' ? t('modal.approveTitle') : t('modal.rejectTitle')}
              </h2>
              <p className="text-[#52525B] mb-4">
                {reviewAction === 'approve' 
                  ? `${t('modal.approveMessage')} "${selectedSubmission.equipmentName}"?`
                  : `${t('modal.rejectMessage')} "${selectedSubmission.equipmentName}"`}
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t('modal.adminNotes')}</label>
                <textarea
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706]"
                  rows="4"
                  placeholder={reviewAction === 'approve' 
                    ? t('modal.notesPlaceholderApprove')
                    : t('modal.notesPlaceholderReject')}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={submitReview}
                  className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {reviewAction === 'approve' ? t('modal.approveButton') : t('modal.rejectButton')}
                </Button>
                <Button variant="ghost" onClick={() => setShowReviewModal(false)}>
                  {t('modal.cancel')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PendingSubmissionsPage;
