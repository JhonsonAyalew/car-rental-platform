import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MoreVertical } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const RecentBookingsTable = ({ bookings = [] }) => {
  const getStatusBadge = (status) => {
    const badges = {
      confirmed: <Badge variant="approved">Confirmed</Badge>,
      pending: <Badge variant="pending">Pending</Badge>,
      completed: <Badge variant="completed">Completed</Badge>,
      cancelled: <Badge variant="cancelled">Cancelled</Badge>,
    };
    return badges[status] || <Badge variant="pending">{status}</Badge>;
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#A1A1AA]">No recent bookings</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-[#E4E4E7]">
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Booking ID</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Customer</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Car</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Dates</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Amount</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Status</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6] transition">
              <td className="py-3 px-4 text-sm font-medium text-[#1A1A1A]">#{booking.id}</td>
              <td className="py-3 px-4">
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{booking.customerName}</p>
                  <p className="text-xs text-[#A1A1AA]">{booking.customerEmail}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <img src={booking.carImage} alt={booking.carName} className="w-8 h-8 rounded object-cover" />
                  <span className="text-sm text-[#1A1A1A]">{booking.carName}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <p className="text-sm text-[#1A1A1A]">{booking.startDate}</p>
                <p className="text-xs text-[#A1A1AA]">to {booking.endDate}</p>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-[#1A1A1A]">${booking.amount}</span>
              </td>
              <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Link to={`/admin/bookings/${booking.id}`}>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookingsTable;
