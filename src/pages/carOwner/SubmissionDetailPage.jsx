import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { 
  Car, 
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
  Share2
} from 'lucide-react';

const SubmissionDetailPage = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSubmission = {
        id: id,
        title: '2022 Toyota Camry XLE',
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        color: 'Silver',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5,
        mileage: 25000,
        engineSize: '2.5L 4-cylinder',
        features: ['GPS Navigation', 'Bluetooth', 'Backup Camera', 'Heated Seats', 'Apple CarPlay'],
        pricePerDay: 65,
        pricePerWeek: 380,
        pricePerMonth: 1200,
        securityDeposit: 250,
        lateFee: 15,
        location: 'New York, NY',
        pickupInstructions: 'Parking garage Level 2, Spot #42. Call 10 minutes before pickup.',
        contactPhone: '+1 234 567 8900',
        description: 'Well-maintained Toyota Camry, perfect for business trips or family vacations. Clean interior, regularly serviced.',
        status: 'approved',
        submittedAt: '2024-01-15T10:30:00Z',
        reviewedAt: '2024-01-18T14:20:00Z',
        images: [
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
          'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
          'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800'
        ],
        views: 245,
        bookings: 12,
        earnings: 780,
        adminNotes: 'Great condition, approved for immediate listing.'
      };
      setSubmission(mockSubmission);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const getStatusConfig = (status) => {
    const configs = {
      approved: { badge: <Badge variant="approved">✓ Approved</Badge>, icon: <CheckCircle className="w-6 h-6 text-green-500" />, color: 'green' },
      pending: { badge: <Badge variant="pending">⏳ Pending Review</Badge>, icon: <Clock className="w-6 h-6 text-yellow-500" />, color: 'yellow' },
      rejected: { badge: <Badge variant="rejected">✗ Rejected</Badge>, icon: <XCircle className="w-6 h-6 text-red-500" />, color: 'red' },
      review: { badge: <Badge variant="review">📝 Under Review</Badge>, icon: <AlertCircle className="w-6 h-6 text-purple-500" />, color: 'purple' }
    };
    return configs[status] || configs.pending;
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
          Back to My Submissions
        </Link>
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{submission.title}</h1>
              {statusConfig.badge}
            </div>
            <p className="text-[#52525B]">
              Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
              {submission.reviewedAt && ` • Reviewed on ${new Date(submission.reviewedAt).toLocaleDateString()}`}
            </p>
          </div>
          
          <div className="flex gap-2">
            {submission.status === 'rejected' && (
              <Link to="/owner/submit-car">
                <Button iconLeft={<Edit className="w-4 h-4" />}>
                  Resubmit Car
                </Button>
              </Link>
            )}
            <Button variant="ghost" iconLeft={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
            <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
              Export
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
              <img src={img} alt={`Car ${idx + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Car className="text-[#D97706]" />
                Car Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Brand</span>
                  <span className="font-medium">{submission.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Model</span>
                  <span className="font-medium">{submission.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Year</span>
                  <span className="font-medium">{submission.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Color</span>
                  <span className="font-medium">{submission.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Transmission</span>
                  <span className="font-medium">{submission.transmission}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Fuel Type</span>
                  <span className="font-medium">{submission.fuelType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Seats</span>
                  <span className="font-medium">{submission.seats} seats</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Mileage</span>
                  <span className="font-medium">{submission.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Engine</span>
                  <span className="font-medium">{submission.engineSize}</span>
                </div>
              </div>
            </Card>
            
            {/* Features */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-[#D97706]" />
                Features & Amenities
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
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-[#52525B] leading-relaxed">{submission.description}</p>
              </Card>
            )}
            
            {/* Admin Notes */}
            {submission.adminNotes && (
              <Card variant="info" className="bg-blue-50 border-blue-200">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-blue-800">
                  <AlertCircle className="w-5 h-5" />
                  Admin Feedback
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
                Pricing
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#52525B]">Per Day</span>
                  <span className="text-2xl font-bold text-[#D97706]">${submission.pricePerDay}</span>
                </div>
                {submission.pricePerWeek && (
                  <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                    <span className="text-[#52525B]">Per Week</span>
                    <span className="font-medium">${submission.pricePerWeek}</span>
                  </div>
                )}
                {submission.pricePerMonth && (
                  <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                    <span className="text-[#52525B]">Per Month</span>
                    <span className="font-medium">${submission.pricePerMonth}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                  <span className="text-[#52525B]">Security Deposit</span>
                  <span className="font-medium">${submission.securityDeposit}</span>
                </div>
                {submission.lateFee && (
                  <div className="flex justify-between py-2 border-t border-[#E4E4E7]">
                    <span className="text-[#52525B]">Late Fee (per hour)</span>
                    <span className="font-medium text-red-600">${submission.lateFee}</span>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Location Card */}
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="text-[#D97706]" />
                Pickup Location
              </h2>
              <p className="text-[#1A1A1A] font-medium mb-2">{submission.location}</p>
              {submission.pickupInstructions && (
                <div className="mt-3 p-3 bg-[#F3F2EE] rounded-lg">
                  <p className="text-sm text-[#52525B]">
                    <strong>Instructions:</strong> {submission.pickupInstructions}
                  </p>
                </div>
              )}
              <div className="mt-3 flex items-center gap-2 text-sm text-[#52525B]">
                <span>📞 {submission.contactPhone}</span>
              </div>
            </Card>
            
            {/* Stats Card */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Performance</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#52525B]">Total Views</span>
                  <span className="text-2xl font-bold">{submission.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#52525B]">Total Bookings</span>
                  <span className="text-2xl font-bold">{submission.bookings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#52525B]">Total Earnings</span>
                  <span className="text-2xl font-bold text-green-600">${submission.earnings}</span>
                </div>
              </div>
            </Card>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {submission.status === 'approved' && (
                <Button className="w-full" size="lg">
                  View Live Listing
                </Button>
              )}
              <Button variant="secondary" className="w-full" size="lg">
                Edit Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailPage;
