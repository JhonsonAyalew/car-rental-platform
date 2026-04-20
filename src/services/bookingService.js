import api from './api';

export const bookingService = {
  create:        (data) => api.post('/bookings', data).then(r => r.data),
  getAll:        (p)    => api.get('/bookings', { params: p }).then(r => r.data),
  getById:       (id)   => api.get(`/bookings/${id}`).then(r => r.data),
  getMyBookings: ()     => api.get('/bookings/my').then(r => r.data),
  updateStatus:  (id, status) => api.patch(`/bookings/${id}/status`, { status }).then(r => r.data),
  cancel:        (id)   => api.patch(`/bookings/${id}/cancel`).then(r => r.data),
  confirm:       (id)   => api.patch(`/bookings/${id}/confirm`).then(r => r.data),
  complete:      (id)   => api.patch(`/bookings/${id}/complete`).then(r => r.data),
  checkAvailability: (equipmentId, start, end) =>
    api.get('/bookings/availability', { params: { equipmentId, start, end } }).then(r => r.data),
};
