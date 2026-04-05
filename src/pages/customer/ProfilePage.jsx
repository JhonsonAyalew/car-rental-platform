import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ProfilePage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">My Profile</h1>
      <Card>
        <div className="space-y-4">
          <Input label="Full Name" defaultValue="John Doe" />
          <Input label="Email" defaultValue="john@example.com" />
          <Input label="Phone" defaultValue="+1 234 567 8900" />
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
