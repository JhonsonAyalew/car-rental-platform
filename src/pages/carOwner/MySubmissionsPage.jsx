import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Spinner from '../../components/ui/Spinner';
import { 
  Car, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const MySubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  // Mock data - will be replaced with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSubmissions = [
        {
          id: '1',
          title: '2022 Toyota Camry XLE',
          brand: 'Toyota',
          model: 'Camry',
          year: 2022,
          pricePerDay: 65,
          status: 'approved',
          submittedAt: '2024-01-15T10:30:00Z',
          image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
          location: 'New York, NY',
          views: 245,
          bookings: 12
        },
        {
          id: '2',
          title: '2023 Tesla Model 3',
          brand: 'Tesla',
          model: 'Model 3',
          year: 2023,
          pricePerDay: 120,
          status: 'pending',
          submittedAt: '2024-01-20T14:15:00Z',
          image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
          location: 'Los Angeles, CA',
          views: 89,
          bookings: 0
        },
        {
          id: '3',
          title: '2021 BMW X5',
          brand: 'BMW',
          model: 'X5',
          year: 2021,
          pricePerDay: 95,
          status: 'rejected',
          submittedAt: '2024-01-10T09:00:00Z',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          location: 'Chicago, IL',
          views: 156,
          bookings: 0,
          rejectionReason: 'Please provide clearer interior photos and update the mileage.'
        },
        {
          id: '4',
          title: '2020 Honda CR-V',
          brand: 'Honda',
          model: 'CR-V',
          year: 2020,
          pricePerDay: 55,
          status: 'review',
          submittedAt: '2024-01-18T11:45:00Z',
          image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
          location: 'Miami, FL',
          views: 34,
          bookings: 0
        }
      ];
      setSubmissions(mockSubmissions);
      setLoading(false);
    }, 1000);
  }, []);
  
  const getStatusBadge = (status) => {
    const badges = {
      approved: <Badge variant="approved">✓ Approved</Badge>,
      pending: <Badge variant="pending">⏳ Pending Review</Badge>,
      rejected: <Badge variant="rejected">✗ Rejected</Badge>,
      review: <Badge variant="review">📝 Under Review</Badge>
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
  
  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });
  
  const stats = {
    total: submissions.length,
    approved: submissions.filter(s => s.status === 'approved').length,
    pending: submissions.filter(s => s.status === 'pending').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
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
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">My Car Submissions</h1>
          <p className="text-[#52525B]">Track and manage your listed vehicles</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card variant="info" className="text-center">
            <Car className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
            <p className="text-sm text-[#52525B]">Total Cars</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-green-500">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.approved}</p>
            <p className="text-sm text-[#52525B]">Approved</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-yellow-500">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.pending}</p>
            <p className="text-sm text-[#52525B]">Pending</p>
          </Card>
          
          <Card variant="info" className="text-center border-l-4 border-red-500">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">{stats.rejected}</p>
            <p className="text-sm text-[#52525B]">Rejected</p>
          </Card>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'All', count: stats.total },
            { value: 'approved', label: 'Approved', count: stats.approved, color: 'green' },
            { value: 'pending', label: 'Pending', count: stats.pending, color: 'yellow' },
            { value: 'review', label: 'Review', count: submissions.filter(s => s.status === 'review').length, color: 'purple' },
            { value: 'rejected', label: 'Rejected', count: stats.rejected, color: 'red' }
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
            icon={<Car className="w-16 h-16" />}
            title="No submissions found"
            description="You haven't submitted any cars matching this filter."
            action={
              <Link to="/owner/submit-car">
                <Button>Submit Your First Car</Button>
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
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-[#1A1A1A]">
                              {submission.title}
                            </h3>
                            <p className="text-sm text-[#52525B]">
                              {submission.year} • {submission.brand} {submission.model}
                            </p>
                          </div>
                          {getStatusBadge(submission.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <DollarSign className="w-4 h-4" />
                            <span>${submission.pricePerDay}/day</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <MapPin className="w-4 h-4" />
                            <span>{submission.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#52525B]">
                            <Eye className="w-4 h-4" />
                            <span>{submission.views} views</span>
                          </div>
                        </div>
                        
                        {submission.status === 'rejected' && submission.rejectionReason && (
                          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700 flex items-start gap-2">
                              <XCircle className="w-4 h-4 mt-0.5" />
                              <span><strong>Rejection reason:</strong> {submission.rejectionReason}</span>
                            </p>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          <Link to={`/owner/submission/${submission.id}`}>
                            <Button variant="ghost" size="sm" iconLeft={<Eye className="w-4 h-4" />}>
                              View Details
                            </Button>
                          </Link>
                          {submission.status === 'rejected' && (
                            <Link to="/owner/submit-car">
                              <Button size="sm" iconLeft={<Edit className="w-4 h-4" />}>
                                Resubmit
                              </Button>
                            </Link>
                          )}
                          <Button variant="ghost" size="sm" iconLeft={<Trash2 className="w-4 h-4" />} className="text-red-600 hover:bg-red-50">
                            Delete
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
          <Link to="/owner/submit-car">
            <Button size="lg" iconLeft={<Car className="w-5 h-5" />}>
              Submit Another Car
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MySubmissionsPage;
