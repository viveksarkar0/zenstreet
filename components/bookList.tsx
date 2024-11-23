'use client'
import { IBooking } from '@/type/booking';
import React, { useEffect, useState } from 'react';

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [filters, setFilters] = useState({
    userId: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    const fetchBookings = async () => {
      const queryParams = new URLSearchParams();

      if (filters.userId) {
        queryParams.append('userId', filters.userId);
      }
      if (filters.startTime) {
        queryParams.append('startTime', filters.startTime);
      }
      if (filters.endTime) {
        queryParams.append('endTime', filters.endTime);
      }

      const response = await fetch(`http://localhost:3000/api/bookings?${queryParams.toString()}`);
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    };

    fetchBookings();
  }, [filters]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Filter Bookings</h2>
        
        <div className="space-y-2">
          <div>
            <label className="block text-gray-600 font-medium">User ID Filter</label>
            <input
              type="text"
              value={filters.userId}
              onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Start Time Filter</label>
            <input
              type="datetime-local"
              value={filters.startTime}
              onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">End Time Filter</label>
            <input
              type="datetime-local"
              value={filters.endTime}
              onChange={(e) => setFilters({ ...filters, endTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
          {bookings.length > 0 ? (
            <ul className="space-y-4 mt-4">
              {bookings.map((booking) => (
                <li
                  key={booking.userId}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-gray-700">
                    <strong className="font-medium">User ID:</strong> {booking.userId} <br />
                    <strong className="font-medium">Start Time:</strong> {new Date(booking.startTime).toLocaleString()} <br />
                    <strong className="font-medium">End Time:</strong> {new Date(booking.endTime).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
