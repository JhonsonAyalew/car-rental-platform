import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const AdminProfilePage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Admin Profile</h1>
      
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E4E4E7]">
            <div className="w-20 h-20 rounded-full bg-[#D97706] flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
            <div>
              <h2 className="text-xl font-semibold">Admin User</h2>
              <p className="text-[#52525B]">Administrator</p>
            </div>
          </div>
          
          <Input label="Full Name" defaultValue="Admin User" />
          <Input label="Email Address" defaultValue="admin@example.com" />
          <Input label="Phone Number" defaultValue="+1 234 567 8900" />
          
          <div className="pt-4">
            <Button>Update Profile</Button>
            <Button variant="ghost" className="ml-3">Change Password</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminProfilePage;
