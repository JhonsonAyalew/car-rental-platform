import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  UserPlus, Edit, Trash2, Shield, Mail, Phone, Calendar,
  CheckCircle, XCircle, Search, Filter, Download
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'admin', phone: ''
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    setTimeout(() => {
      const mockAdmins = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          role: 'super_admin',
          status: 'active',
          lastActive: '2024-01-20T10:30:00Z',
          createdAt: '2023-06-15',
          permissions: ['all']
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 234 567 8901',
          role: 'admin',
          status: 'active',
          lastActive: '2024-01-19T14:20:00Z',
          createdAt: '2023-08-20',
          permissions: ['cars', 'bookings', 'users']
        },
        {
          id: 3,
          name: 'Mike Brown',
          email: 'mike@example.com',
          phone: '+1 234 567 8902',
          role: 'admin',
          status: 'inactive',
          lastActive: '2024-01-10T09:15:00Z',
          createdAt: '2023-10-10',
          permissions: ['cars', 'owners']
        }
      ];
      setAdmins(mockAdmins);
      setLoading(false);
    }, 1000);
  };

  const handleAddAdmin = () => {
    toast.success('Admin added successfully!');
    setShowAddModal(false);
    setFormData({ name: '', email: '', password: '', role: 'admin', phone: '' });
  };

  const handleDeleteAdmin = (admin) => {
    toast.success(`Admin ${admin.name} removed`);
    setSelectedAdmin(null);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Admin Management</h1>
          <p className="text-[#52525B] mt-1">Manage platform administrators</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} iconLeft={<UserPlus className="w-4 h-4" />}>
          Add New Admin
        </Button>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button variant="ghost" iconLeft={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAdmins.map((admin, index) => (
          <motion.div
            key={admin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D97706] flex items-center justify-center text-white font-bold">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{admin.name}</h3>
                    <Badge variant={admin.role === 'super_admin' ? 'approved' : 'pending'}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                    <Badge variant={admin.status === 'active' ? 'approved' : 'cancelled'}>
                      {admin.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#52525B] mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{admin.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{admin.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Joined {admin.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" iconLeft={<Edit className="w-4 h-4" />}>
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600"
                  onClick={() => setSelectedAdmin(admin)}
                  iconLeft={<Trash2 className="w-4 h-4" />}
                >
                  Remove
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleAddAdmin}>Add Admin</Button>
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedAdmin && (
        <Modal onClose={() => setSelectedAdmin(null)}>
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Remove Admin</h2>
            <p className="text-[#52525B] mb-6">
              Are you sure you want to remove {selectedAdmin.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="danger" onClick={() => handleDeleteAdmin(selectedAdmin)}>
                Yes, Remove
              </Button>
              <Button variant="ghost" onClick={() => setSelectedAdmin(null)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminsPage;
