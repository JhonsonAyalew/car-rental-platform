import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const RecentSubmissionsTable = ({ submissions = [] }) => {
  const getStatusBadge = (status) => {
    const badges = {
      pending: <Badge variant="pending">⏳ Pending</Badge>,
      approved: <Badge variant="approved">✓ Approved</Badge>,
      rejected: <Badge variant="rejected">✗ Rejected</Badge>,
      review: <Badge variant="review">📝 In Review</Badge>,
    };
    return badges[status] || badges.pending;
  };

  const getActionButtons = (status, id) => {
    if (status === 'pending') {
      return (
        <Link to={`/admin/submissions/${id}`}>
          <Button size="sm" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Review
          </Button>
        </Link>
      );
    }
    
    return (
      <Link to={`/admin/submissions/${id}`}>
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      </Link>
    );
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#A1A1AA]">No pending submissions</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-[#E4E4E7]">
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Car</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Owner</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Submitted</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Price/Day</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Status</th>
            <th className="text-left py-3 px-4 text-[13px] font-medium text-[#52525B]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-b border-[#E4E4E7] hover:bg-[#F9F8F6] transition">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <img src={submission.carImage} alt={submission.carName} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{submission.carName}</p>
                    <p className="text-xs text-[#A1A1AA]">{submission.year} • {submission.brand}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{submission.ownerName}</p>
                  <p className="text-xs text-[#A1A1AA]">{submission.ownerEmail}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <p className="text-sm text-[#1A1A1A]">{submission.submittedDate}</p>
                <p className="text-xs text-[#A1A1AA]">{submission.submittedTime}</p>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-[#D97706]">${submission.pricePerDay}/day</span>
              </td>
              <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {getActionButtons(submission.status, submission.id)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSubmissionsTable;
