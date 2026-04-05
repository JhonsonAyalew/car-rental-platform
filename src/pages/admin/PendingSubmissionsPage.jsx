import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronUp
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const PendingSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
          carName: '2023 Mercedes-Benz C-Class',
          brand: 'Mercedes-Benz',
          model: 'C-Class',
          year: 2023,
          color: 'Black',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          mileage: 12500,
          pricePerDay: 95,
          pricePerWeek: 550,
          securityDeposit: 300,
          location: 'Los Angeles, CA',
          description: 'Luxury sedan in excellent condition. Full service history available.',
          images: [
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
          ],
          features: ['Leather Seats', 'Sunroof', 'Premium Sound', 'Bluetooth', 'Backup Camera'],
          owner: {
            id: 'OWN-001',
            name: 'David Wilson',
            email: 'david@example.com',
            phone: '+1 234 567 8901',
            joinedDate: '2023-06-15',
            totalCars: 3,
            rating: 4.8
          },
          submittedAt: '2024-01-22T10:30:00Z',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'SUB-002',
          carName: '2022 Audi Q5',
          brand: 'Audi',
          model: 'Q5',
          year: 2022,
          color: 'White',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          mileage: 28000,
          pricePerDay: 110,
          pricePerWeek: 650,
          securityDeposit: 350,
          location: 'San Francisco, CA',
          description: 'Luxury SUV with Quattro all-wheel drive.',
          images: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
            'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=400'
          ],
          features: ['All-Wheel Drive', 'Panoramic Roof', 'Heated Seats', 'Navigation'],
          owner: {
            id: 'OWN-002',
            name: 'Lisa Anderson',
            email: 'lisa@example.com',
            phone: '+1 234 567 8902',
            joinedDate: '2023-08-20',
            totalCars: 2,
            rating: 4.9
          },
          submittedAt: '2024-01-21T14:15:00Z',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: 'SUB-003',
          carName: '2023 Ford Mustang GT',
          brand: 'Ford',
          model: 'Mustang GT',
          year: 2023,
          color: 'Red',
          transmission: 'Manual',
          fuelType: 'Petrol',
          seats: 4,
          mileage: 5200,
          pricePerDay: 130,
          pricePerWeek: 780,
          securityDeposit: 400,
          location: 'Miami, FL',
          description: 'Powerful V8 muscle car.',
          images: [
            'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400'
          ],
          features: ['V8 Engine', 'Premium Audio', 'Leather Seats', 'Performance Package'],
          owner: {
            id: 'OWN-003',
            name: 'Tom Harris',
            email: 'tom@example.com',
            phone: '+1 234 567 8903',
            joinedDate: '2023-10-10',
            totalCars: 1,
            rating: 5.0
          },
          submittedAt: '2024-01-20T09:45:00Z',
          status: 'pending',
          priority: 'high'
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
    
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, statusFilter, sortBy, submissions]);

  const handleReview = (submission, action) => {
    setSelectedSubmission(submission);
    setReviewAction(action);
    setShowReviewModal(true);
    setReviewNotes('');
  };

  const submitReview = async () => {
    if (!reviewNotes && reviewAction === 'reject') {
      toast.error('Please provide a reason for rejection');
      return;
    }
    
    toast.loading(`Processing ${reviewAction}...`, { id: 'review' });
    
    setTimeout(() => {
      const updatedSubmissions = submissions.map(sub => 
        sub.id === selectedSubmission.id 
          ? { ...sub, status: reviewAction === 'approve' ? 'approved' : 'rejected' }
          : sub
      );
      setSubmissions(updatedSubmissions);
      
      toast.success(`Car ${reviewAction === 'approve' ? 'approved' : 'rejected'} successfully!`, { id: 'review' });
      
      setShowReviewModal(false);
      setSelectedSubmission(null);
      setReviewNotes('');
    }, 1500);
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'high') return <Badge variant="pending">⚠️ High Priority</Badge>;
    if (priority === 'medium') return <Badge variant="review">📝 Medium Priority</Badge>;
    return <Badge variant="completed">✓ Low Priority</Badge>;
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return <Badge variant="pending">⏳ Pending Review</Badge>;
    if (status === 'approved') return <Badge variant="approved">✓ Approved</Badge>;
    if (status === 'rejected') return <Badge variant="rejected">✗ Rejected</Badge>;
    return <Badge variant="review">📝 In Review</Badge>;
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Pending Submissions</h1>
          <p className="text-[#52525B] mt-1">Review and manage car owner submissions</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={fetchSubmissions}>
            Refresh
          </Button>
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{pendingCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{reviewCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" /> In Review
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3" /> Approved
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          <p className="text-sm text-[#52525B] flex items-center justify-center gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by car, brand, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>
      </Card>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredSubmissions.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-[#D97706] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-[#52525B]">No pending submissions to review.</p>
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
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-[#E4E4E7]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-lg font-semibold text-[#1A1A1A]">
                          {submission.carName}
                        </h2>
                        {getPriorityBadge(submission.priority)}
                        {getStatusBadge(submission.status)}
                      </div>
                      <p className="text-sm text-[#52525B] mt-1">
                        Submitted {formatDate(submission.submittedAt)}
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
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReview(submission, 'reject')}
                            variant="danger"
                            iconLeft={<XCircle className="w-4 h-4" />}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                        iconRight={expandedId === submission.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      >
                        {expandedId === submission.id ? 'Show Less' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 pt-4">
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <DollarSign className="w-4 h-4" />
                      <span>${submission.pricePerDay}/day</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#52525B]">
                      <Car className="w-4 h-4" />
                      <span>{submission.year} • {submission.mileage.toLocaleString()} km</span>
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
                  
                  <AnimatePresence>
                    {expandedId === submission.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-[#E4E4E7]"
                      >
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div>
                            <h3 className="font-semibold mb-2">Photos</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {submission.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Car ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Car Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">Brand/Model:</span>
                                <span>{submission.brand} {submission.model}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">Year:</span>
                                <span>{submission.year}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">Color:</span>
                                <span>{submission.color}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">Transmission:</span>
                                <span>{submission.transmission}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#52525B]">Fuel Type:</span>
                                <span>{submission.fuelType}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Owner Information</h3>
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
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">Description</h3>
                          <p className="text-sm text-[#52525B]">{submission.description}</p>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">Features</h3>
                          <div className="flex flex-wrap gap-2">
                            {submission.features.map(feature => (
                              <span key={feature} className="px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded text-xs">
                                {feature}
                              </span>
                            ))}
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
                {reviewAction === 'approve' ? 'Approve Car Listing' : 'Reject Car Listing'}
              </h2>
              <p className="text-[#52525B] mb-4">
                {reviewAction === 'approve' 
                  ? `Are you sure you want to approve "${selectedSubmission.carName}"?`
                  : `Please provide a reason for rejecting "${selectedSubmission.carName}"`}
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Admin Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706]"
                  rows="4"
                  placeholder={reviewAction === 'approve' 
                    ? "Add any notes for the owner (optional)..."
                    : "Explain why the car is being rejected (required)..."}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={submitReview}
                  className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {reviewAction === 'approve' ? 'Yes, Approve Car' : 'Yes, Reject Car'}
                </Button>
                <Button variant="ghost" onClick={() => setShowReviewModal(false)}>
                  Cancel
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
