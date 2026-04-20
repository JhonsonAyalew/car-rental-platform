import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const BookingDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Booking #{id}</h1>
      <Card>
        <p className="text-[#52525B]">Booking details will appear here</p>
      </Card>
    </div>
  );
};

export default BookingDetailPage;
