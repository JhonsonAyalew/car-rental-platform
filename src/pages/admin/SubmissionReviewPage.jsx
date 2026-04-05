import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Car,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Gauge,
  Settings,
  Fuel,
  Users,
  Star,
  AlertCircle,
  Send,
  MessageSquare
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

const SubmissionReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState('');
  const [action, setAction] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSubmissionDetails();
  }, [id]);

  const fetchSubmissionDetails = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockSubmission = {
        id: id,
        carName: '2023 Mercedes-Benz C-Class',
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2023,
        color: 'Black',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5,
        mileage: 12500,
        engineSize: '2.0L Turbo',
        vin: 'W1KAF4FBXPR123456',
        licensePlate: 'ABC1234',
        pricePerDay: 95,
        pricePerWeek: 550,
        pricePerMonth: 1800,
        securityDeposit: 300,
        lateFee: 15,
        location: 'Los Angeles, CA',
        pickupInstructions: 'Parking garage Level 2, Spot #15. Call 30 minutes before pickup.',
        description: 'Luxury sedan in excellent condition. Full service history available. Features include leather seats, sunroof, and premium sound system.',
        images: [
          'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
          'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
        ],
        features: ['Leather Seats', 'Sunroof', 'Premium Sound', 'Bluetooth', 'Backup Camera', 'Heated Seats', 'Navigation'],
        owner: {
          id: 'OWN-001',
          name: 'David Wilson',
          email: 'david@example.com',
          phone: '+1 234 567 8901',
          avatar: null,
          joinedDate: '2023-06-15',
          totalCars: 3,
          approvedCars: 2,
          rating: 4.8,
          totalReviews: 24,
          verificationStatus: 'verified'
        },
        submittedAt: '2024-01-22T10:30:00Z',
        status: 'pending',
        priority: 'high'
      };
      setSubmission(mockSubmission);
      setLoading(false);
    }, 1000);
  };

  const handleApprove = async () => {
    setAction('approve');
    setProcessing(true);
    
    toast.loading('Approving car listing...', { id: 'review' });
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Car approved successfully!', { id: 'review' });
      setTimeout(() => {
        navigate('/admin/submissions');
      }, 1500);
    }, 2000);
  };

  const handleReject = async () => {
    if (!reviewNotes) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    
    setAction('reject');
    setProcessing(true);
    
    toast.loading('Rejecting car listing...', { id: 'review' });
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Car rejected. Owner will be notified.', { id: 'review' });
      setTimeout(() => {
        navigate('/admin/submissions');
      }, 1500);
    }, 2000);
  };

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
      
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/submissions">
            <Button variant="ghost" iconLeft={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              Review Submission
            </h1>
            <p className="text-[#52525B] mt-1">
              #{submission.id} • Submitted {new Date(submission.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={handleApprove}
            disabled={processing}
            className="bg-green-600 hover:bg-green-700"
            iconLeft={<CheckCircle className="w-4 h-4" />}
          >
            Approve Car
          </Button>
          <Button
            onClick={handleReject}
            disabled={processing}
            variant="danger"
            iconLeft={<XCircle className="w-4 h-4" />}
          >
            Reject Car
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {submission.images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Car ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  whileHover={{ scale: 1.02 }}
                />
              ))}
            </div>
          </Card>

          {/* Car Details */}
          <Card>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Car className="text-[#D97706]" />
              Car Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
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
                  <span className="text-[#52525B]">VIN</span>
                  <span className="font-medium text-sm">{submission.vin}</span>
                </div>
              </div>
              <div className="space-y-3">
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
                  <span className="font-medium">{submission.seats}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                  <span className="text-[#52525B]">Mileage</span>
                 </span>
                  <span className=" <spanfont-medium">{sub className="font-medium">{submission.mileage.toLocalemission.mileage.toLocaleString()} km</span>
String()} km</span>
                </                </div>
                <div classNamediv>
                <div className="flex justify-between="flex justify-between py- py-2 border-b border-[#E4E42 border-b border-[#E4E4E7E7]">
                  <span className="text-[#52525]">
                  <span className="text-[#52525B]B]">Engine</">Engine</span>
                  <span>
                  <span className="fontspan className="font-medium">{submission.engineSize}</span>
                </-medium">{submission.engineSize}</span>
                </div>
              </div>
              </div>
            </div>
            </div>
          </Card>

          {/*div>
          </Card>

          {/* Features */}
          <Card>
            < Features */}
          <Card>
            <h2 className="h2 className="text-lg font-semiboldtext-lg font-semibold mb-4 flex items-center gap-2">
 mb-4 flex items-center gap-2">
              <Settings className="text              <Settings className="text-[#-[#D97706]" />
             D97706]" />
              Features & Features & Amenities
            </h2>
 Amenities
            </h2>
            <div className="flex flex-wrap gap-            <div className="flex flex-wrap2">
              { gap-2">
              {submissionsubmission.features.map(f.features.map(featureeature => (
                < => (
                <span keyspan key={feature} className="px-3={feature} className="px-3 py-1.5 bg-[# py-1.5 bg-[#FEF3C7]FEF3C7] text text-[#924-[#92400E] rounded-lg text-sm00E] rounded-lg text-sm">
                 ">
                  {feature}
                </span>
              ))}
            </div {feature}
                </span>
              ))}
            </div>
          </Card>

          {/* Description>
          </Card>

          {/* Description */}
          <Card>
            */}
          <Card>
            <h <h2 className="text-lg font-semib2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-[#52525B] leading-relaxedold mb-3">Description</h2>
            <p className="text-[#52525B] leading-relaxed">{submission.description}</p>
         ">{submission.description}</p>
          </Card </Card>

         >

          {/* Location {/* Location & Pickup */}
          <Card>
 & Pickup */}
          <Card>
            <            <h2 className="text-lg font-semh2 className="text-lg font-semibold mb-ibold mb-4 flex items-center gap-2">
              <4 flex items-center gap-2">
              <MapPin className="text-[#D97706]" />
MapPin className="text-[#D97706]" />
              Pick              Pickup Information
           up Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#52525B] mb- </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#52525B] mb-1">Location</1">Location</p>
                <p>
                <p className="font-medium">{p className="font-medium">{submissionsubmission.location}</p>
              </.location}</p>
              </div>
              <div>
                <div>
              <div>
                <p className="text-sm text-[#52525B]p className="text-sm text-[#52525B] mb-1">Instructions mb-1">Instructions</</p>
p>
                <p className="text-sm">{submission.pickupInstructions                <p className="text-sm">{submission.pickupInstructions}</p>
              </div>
           }</p>
              </div>
            </div>
          </Card </div>
          </Card>
       >
        </div>

        {/* Sidebar */}
        <div className="space </div>

        {/* Sidebar */}
        <div className="space-y-6">
-y-6">
          {/* Pricing Card          {/* Pricing Card */}
          <Card */}
          <Card>
            <h2 className="text>
            <h2 className="text-lg font-semibold mb-lg font-semibold mb-4 flex items-center gap-2">
             -4 flex items-center gap-2">
              <D <DollarSign className="textollarSign className="-[#D97706]" />
              Pricingtext-[#D97706]" />
              Pricing
            </h
           2>
            <div className="space </h2>
            <div className="space-y--y-3">
              <div className3">
              <div className="flex justify-between="flex justify-between items-center py-2">
                <span className="text-[#52525B]">Daily items-center py-2">
                <span className="text-[#52525B]">Daily Rate</ Rate</span>
                <span>
                <span classNamespan className="text="text-2xl font-bold text-2xl font-bold text-[#-[#D97706D97706]">${]">${submissionsubmission.pricePer.pricePerDay}</span>
Day}</span>
              </div>
              <              </div>
              <div className="flex justify-between py-2 border-t borderdiv className="flex justify-between py-2 border-[#E4-t border-[#E4E4E7]">
E4E7]">
                <                <span className="text-[#52525B]">Weekly Rate</spanspan className="text-[#52525B]">Weekly Rate</span>
                <>
                <span className="font-medium">span className="font-medium">${submission.pricePerWeek}</span${submission.pricePerWeek}</span>
              </div>
             >
              </div>
              <div className="flex justify-between py-2 border <div className="flex justify-between py-2 border-t border-[#-t border-[#E4E4E4E4E7E7]">
]">
                <span className                <span className="text-[#52525B]="text-[#52525B]">Monthly Rate</span>
                <">Monthly Rate</span>
                <span className="font-medium">span className="font-medium">${submission.pricePerMonth${submission.pricePerMonth}</span>
              </div>
              <div className="}</span>
              </div>
              <div className="flex justify-between py-2 border-t borderflex justify-between py-2 border-t border-[#E-[#E4E4E4E4E7]7]">
                <span className="text">
                <span className="text-[#52525B-[#52525B]">Security Deposit</span]">Security Deposit</span>
                <span>
                <span className="font-medium">${submission className="font-medium">${submission.securityDeposit}</span>
.securityDeposit}</              </div>
              <span>
              </div>
              <div className="flex justify-betweendiv className="flex justify-between py-2 border py-2 border-t border-[#E4E4-t border-[#E4E4E7]">
                <E7]">
                <span className="text-[#span className="text-[#52525B]">Late Fee (per hour)</span>
               52525B]">Late Fee (per hour)</span>
                <span className="font-medium <span className="font-medium text-red text-red-600">${submission.late-600">${submission.lateFee}</span>
              </div>
Fee}</span>
              </div>
            </div>
          </Card>

          {/* Owner Information            </div>
          </Card>

          {/* Owner Information */}
          <Card>
 */}
          <Card>
            <h2            <h2 className=" className="text-lg font-semtext-lg font-semibold mb-4 flex items-center gap-2">
              <User className="textibold mb-4 flex items-center gap-2">
              <User className="text-[#-[#D977D97706]" />
             06]" />
              Owner Information
            Owner Information
            </h </h2>
            <div className2>
            <div className="space-y-3">
              <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3="flex items-center gap-3 pb-3 border-b border border-b border-[#E4E4E7]">
                <div className="-[#E4E4E7]">
                <div className="w-12 h-12 rounded-full bgw-12 h-12 rounded-full bg-[#D97706] flex items-center-[#D97706] flex items-center justify-center justify-center text-white font-bold">
                  text-white font-bold">
                  {submission.owner.name.charAt(0)}
                </div>
 {submission.owner.name.charAt(0)}
                </div>
                <div>
                  <                <div>
                  <p className="font-semibp className="font-semibold">{submission.ownerold">{submission.owner.name}</p>
                  <div className="flex items-center.name}</p>
 gap-1">
                  <div className="flex items-center gap-1">
                    <                    <Star className="wStar className="w-3-3 h- h-3 text-yellow3 text-500" />
-yellow-500" />
                    <span className="text-sm">{submission                    <span className="text-sm">{submission.owner.rating} ⭐</span>
                    <span className.owner.rating} ⭐</span>
                    <span className="="text-xs text-[#A1A1AA]">({text-xs text-[#A1A1AA]">({submission.owner.totalReviews} reviews)</spansubmission.owner.totalReviews} reviews)</span>
                  </div>
               >
                  </div>
                </div>
              </div>
              </div>
             </div>
              
               
              <div className="flex items-center gap-2 text-sm">
                <Mail <div className="flex items-center gap-2 text-sm">
                <Mail className="w- className="w-4 h-44 h-4 text text-[#52525B]" />
-[#52525B]" />
                <span>{submission                <span>{submission.owner.owner.email}</span>
              </div>
.email}</span>
              </div>
              <div className="flex items-center gap-              <div className="flex items-center gap-2 text-sm">
2 text-sm">
                <                <Phone className="wPhone className="w-4-4 h-4 text h-4 text-[#52525B]" />
                <span>{sub-[#52525B]" />
                <span>{submission.owner.phone}</span>
mission.owner.phone}</span>
              </div>
              <              </div>
              <div className="flexdiv className items-center gap-="flex items-center gap-2 text-sm">
2 text-sm">
                <Calendar className="w-4 h-4 text-[#52525                <Calendar className="w-4 h-4 text-[#52525B]" />
                <span>JoinedB]" />
                <span>Joined {new Date(submission.owner.joinedDate).toLocaleDateString()}</ {new Date(submission.owner.joinedDate).toLocaleDateString()}</span>
              </div>
span>
              </div>
              <div className="flex              <div className="flex items-center gap-2 text-sm">
                <Car className="w-4 h- items-center gap-2 text-sm">
                <Car className="w-44 text-[#52525 h-4 text-[#52525B]" />
                <spanB]" />
                <span>{submission.owner.totalCars} cars listed ({>{submission.owner.totalCars} cars listed ({submission.owner.approvedCars} approved)</span>
              </submission.owner.approvedCars} approved)</span>
              </div>
              
div>
              
              <              <div classNamediv className="mt="mt-3-3 pt-3 border-t border-[# pt-3 border-t borderE4E4E7-[#E4E4E7]">
                <Badge variant="approved">]">
                <Badge variant="approved">✓ {✓ {submission.ownersubmission.owner.verificationStatus}</Badge>
.verificationStatus}</Badge>
              </              </div>
div>
            </div>
          </Card>

            </div>
          </Card>

          {/* Admin Review Notes */}
          <Card>
            <h2 className="text-lg          {/* Admin Review Notes */}
          <Card>
            <h2 className="text-lg font-semibold mb-4 flex font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="text-[#D97706 items-center gap-2">
              <MessageSquare className="text]" />
              Review Notes
-[#D97706]" />
              Review Notes
            </h2            </h2>
            <textarea
             >
            <textarea className="w-full px-3 py-2
              className="w-full px-3 py-2 border border border border-[#E4E4-[#E4E4E7] roundedE7] rounded-lg focus:out-lg focus:outline-none focus:borderline-none focus:border-[#D97706] mb-3"
              rows="4"
              placeholder="Add-[#D97706] mb-3"
              rows="4"
              placeholder="Add notes about notes about this submission this submission (optional (optional for for approval, required for approval, rejection)... required for rejection)..."
              value={reviewNotes"
              value={reviewNotes}
              onChange={(}
              onChange={(e) => setReviewNotes(e.target.value)}
e) => setReviewNotes(e.target.value)}
            />
            <p className="text-xs text-[#            />
            <p className="text-xs text-[#A1A1A1A1AA]">
              These notesAA]">
              These notes will be will be shared with shared with the owner if the submission is rejected.
            the owner if the submission is rejected.
            </p>
          </p>
          </Card>

          {/* Quick Actions */}
 </Card>

          {/* Quick Actions */}
          <div className          <div className="space-y-3">
            <="space-y-3">
            <Button
              onClick={handleApprove}
              disabled={processing}
              className="wButton
              onClick={handleApprove}
              disabled={processing}
              className="w-full-full bg-green-600 hover:bg-green-700"
              size="lg bg-green-600 hover:bg-green-700"
              size"
              iconLeft={<CheckCircle className="w-5 h-="lg"
              iconLeft={<CheckCircle className="w-5 h-5" />}
            >
              Approve Car5" />}
            >
              Approve Car Listing
            </Button>
            <Button Listing
            </Button>
            <Button
              onClick={
              onClick={handleReject}
              disabledhandleReject}
              disabled={processing}
              variant="danger"
              className="w-full"
={processing}
              variant="danger"
              className="w-full"
              size="lg"
              iconLeft={<XCircle className="w-5 h-5" />}
              size="lg"
              iconLeft={<XCircle className="w-5 h-5" />}
            >
              Reject Car Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
            >
              Reject Car Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionReviewPage;
