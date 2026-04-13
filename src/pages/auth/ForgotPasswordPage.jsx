import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">Reset Password</h2>
          <p className="mt-2 text-[#52525B]">We'll send you a link to reset your password</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Button type="submit" className="w-full">Send Reset Link</Button>
          
          <p className="text-center text-sm text-[#52525B]">
            Remember your password?{' '}
            <Link to="/login" className="text-[#D97706] hover:text-[#B45309] font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
