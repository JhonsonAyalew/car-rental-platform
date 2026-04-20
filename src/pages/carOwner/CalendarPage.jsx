import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { StatusBadge } from '../../components/ui/index.jsx';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const BOOKINGS = [
  { id: 'BK-1001', customer: 'Abebe Bekele',  equipment: 'CAT 320',    start: 20, end: 25, status: 'confirmed', amount: 42500 },
  { id: 'BK-1002', customer: 'Selam Tesfaye', equipment: 'HOWO Truck', start: 22, end: 28, status: 'pending',   amount: 28800 },
  { id: 'BK-1003', customer: 'Tekle Berhan',  equipment: 'CAT 320',    start: 5,  end: 8,  status: 'completed', amount: 25500 },
  { id: 'BK-1004', customer: 'Meron Desta',   equipment: 'Loader',     start: 10, end: 14, status: 'confirmed', amount: 36000 },
];

const CalendarPage = () => {
  const now   = new Date();
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(null);

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const getBookingsForDay = (day) => BOOKINGS.filter(b => day >= b.start && day <= b.end);
  const statusColors = { confirmed: '#8b5cf6', pending: 'var(--warning)', completed: 'var(--success)' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Booking Calendar</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>View your bookings by date</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Calendar */}
        <div className="xl:col-span-2 border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          {/* Nav */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-base" style={{ color: 'var(--text-primary)' }}>
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center border transition-colors"
                style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)', color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#8b5cf6'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center border transition-colors"
                style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)', color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#8b5cf6'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="text-center py-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const isToday    = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
              const dayBookings = day ? getBookingsForDay(day) : [];
              const isSelected = selected === day;

              return (
                <div key={i}
                  onClick={() => day && setSelected(isSelected ? null : day)}
                  className="min-h-[60px] p-1.5 transition-all duration-150"
                  style={{
                    background:   isSelected ? 'rgba(139,92,246,0.08)' : day ? 'var(--bg-surface)' : 'transparent',
                    border:       `1px solid ${isToday ? '#8b5cf6' : isSelected ? 'rgba(139,92,246,0.4)' : 'var(--border-faint)'}`,
                    borderRadius: 'var(--r-md)',
                    cursor:       day ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => { if (day && !isSelected) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = day ? 'var(--bg-surface)' : 'transparent'; }}>
                  {day && (
                    <>
                      <span className="text-xs font-bold block mb-1"
                        style={{ color: isToday ? '#8b5cf6' : 'var(--text-secondary)' }}>
                        {day}
                      </span>
                      {dayBookings.slice(0, 2).map(b => (
                        <div key={b.id} className="text-[9px] px-1 py-0.5 mb-0.5 truncate font-semibold"
                          style={{ background: `${statusColors[b.status]}20`, color: statusColors[b.status], borderRadius: '3px' }}>
                          {b.equipment}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <span className="text-[9px] font-semibold" style={{ color: 'var(--text-faint)' }}>+{dayBookings.length - 2}</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Legend */}
          <div className="border p-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Legend</p>
            {Object.entries(statusColors).map(([s, c]) => (
              <div key={s} className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: `${c}25`, border: `1px solid ${c}` }} />
                <span className="text-xs font-medium capitalize" style={{ color: 'var(--text-secondary)' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Selected day or all bookings */}
          <div className="border p-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {selected ? `Jan ${selected} Bookings` : 'All Bookings This Month'}
            </p>
            <div className="space-y-3">
              {(selected ? getBookingsForDay(selected) : BOOKINGS).map(b => (
                <div key={b.id} className="p-3 border" style={{ borderColor: 'var(--border-faint)', borderRadius: 'var(--r-md)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{b.id}</span>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{b.customer}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.equipment}</p>
                  <p className="text-xs mt-1" style={{ color: '#8b5cf6' }}>ETB {b.amount.toLocaleString()}</p>
                </div>
              ))}
              {selected && getBookingsForDay(selected).length === 0 && (
                <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>No bookings on this day</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
