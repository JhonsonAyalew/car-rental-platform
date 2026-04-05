import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Search,
  User,
  Car,
  DollarSign,
  Star,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  Shield,
  Clock
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const CarOwnersPage = () => {
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = () => {
    setLoading(true);
    setTimeout(() => {
      const mockOwners = [
        {
          id: 'OWN-001',
          name: 'David Wilson',
          email: 'david@example.com',
          phone: '+1 234 567 8901',
          avatar: null,
          businessName: 'Wilson Luxury Rentals',
          location: 'Los Angeles, CA',
          joinedDate: '2023-06-15',
          totalCars: 3,
          approvedCars: 3,
          pendingCars: 0,
          totalBookings: 45,
          totalRevenue: 12500,
          rating: 4.8,
          verificationStatus: 'verified',
          documentsSubmitted: true,
          responseRate: 98,
          responseTime: '2 hours'
        },
        {
          id: 'OWN-002',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 234 567 8902',
          avatar: null,
          businessName: 'Johnson Auto Rentals',
          location: 'New York, NY',
          joinedDate: '2023-08-20',
          totalCars: 2,
          approvedCars: 2,
          pendingCars: 0,
          totalBookings: 89,
          totalRevenue: 18500,
          rating: 4.9,
          verificationStatus: 'verified',
          documentsSubmitted: true,
          responseRate: 95,
          responseTime: '3 hours'
        },
        {
          id: 'OWN-003',
          name: 'Mike Brown',
          email: 'mike@example.com',
          phone: '+1 234 567 8903',
          avatar: null,
          businessName: 'Browns Premium Cars',
          location: 'Chicago, IL',
          joinedDate: '2023-10-10',
          totalCars: 1,
          approvedCars: 1,
          pendingCars: 0,
          totalBookings: 34,
          totalRevenue: 15200,
          rating: 4.7,
          verificationStatus: 'pending',
          documentsSubmitted: true,
          responseRate: 92,
          responseTime: '4 hours'
        },
        {
          id: 'OWN-004',
          name: 'Emily Davis',
          email: 'emily@example.com',
          phone: '+1 234 567 8904',
          avatar: null,
          businessName: 'Davis Family Rentals',
          location: 'Miami, FL',
          joinedDate: '2023-11-05',
          totalCars: 2,
          approvedCars: 1,
          pendingCars: 1,
          totalBookings: 23,
          totalRevenue: 8900,
          rating: 4.6,
          verificationStatus: 'pending',
          documentsSubmitted: false,
          responseRate: 88,
          responseTime: '6 hours'
        }
      ];
      setOwners(mockOwners);
      setFilteredOwners(mockOwners);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = [...owners];
    
    if (verificationFilter !== 'all') {
      filtered = filtered.filter(o => o.verificationStatus === verificationFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(o => 
        o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOwners(filtered);
  }, [searchTerm, verificationFilter, owners]);

  const handleVerifyOwner = async (ownerId) => {
    const updatedOwners = owners.map(owner =>
      owner.id === ownerId ? { ...owner, verificationStatus: 'verified' } : owner
    );
    setOwners(updatedOwners);
    toast.success('Owner verified successfully!');
  };

  const stats = {
    total: owners.length,
    verified: owners.filter(o => o.verificationStatus === 'verified').length,
    pending: owners.filter(o => o.verificationStatus === 'pending').length,
    totalCars: owners.reduce((sum, o) => sum + o.totalCars, 0),
    totalRevenue: owners.reduce((sum, o) => sum + o.totalRevenue, 0),
    avgRating: (owners.reduce((sum, o) => sum + o.rating, 0) / owners.length).toFixed(1)
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
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Car Owners</h1>
          <p className="text-[#52525B] mt-1">Manage all car owners on the platform</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="ghost" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={fetchOwners}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
          <p className="text-sm text-[#52525B]">Total Owners</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
          <p className="text-sm text-[#52525B]">Verified</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-[#52525B]">Pending</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#D97706]">{stats.totalCars}</p>
          <p className="text-sm text-[#52525B]">Total Cars</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[#D97706]">${(stats.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#52525B]">Total Revenue</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by name, email, or business..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
          >
            <option value="all">All Owners</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending Verification</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOwners.map((owner) => (
          <motion.div
            key={owner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="hover:shadow-medium transition">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#D97706] flex items-center justify-center text-white text-xl font-bold">
                  {owner.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{owner.name}</h3>
                      <p className="text-sm text-[#52525B]">{owner.businessName}</p>
                    </div>
                    <Badge variant={owner.verificationStatus === 'verified' ? 'approved' : 'pending'}>
                      {owner.verificationStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#52525B]" />
                      <span className="truncate">{owner.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#52525B]" />
                      <span>{owner.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#52525B]" />
                      <span>{owner.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#52525B]" />
                      <span>Joined {new Date(owner.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm pt-3 border-t border-[#E4E4E7]">
                    <div>
                      <p className="text-[#A1A1AA] text-xs">Cars Listed</p>
                      <p className="font-semibold">{owner.totalCars} ({owner.approvedCars} approved)</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] text-xs">Total Bookings</p>
                      <p className="font-semibold">{owner.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] text-xs">Revenue</p>
                      <p className="font-semibold text-[#D97706]">${owner.totalRevenue}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#E4E4E7]">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{owner.rating} ⭐</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-[#52525B]">Response Rate:</span>
                      <span>{owner.responseRate}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-[#52525B]">Response Time:</span>
                      <span>{owner.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Link to={`/admin/owners/${owner.id}`}>
                      <Button size="sm" variant="ghost" iconLeft={<Eye className="w-3 h-3" />}>
                        View Details
                      </Button>
                    </Link>
                    {owner.verificationStatus === 'pending' && (
                      <Button size="sm" onClick={() => handleVerifyOwner(owner.id)} iconLeft={<Shield className="w-3 h-3" />}>
                        Verify Owner
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" iconLeft={<Mail className="w-3 h-3" />}>
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarOwnersPage;
