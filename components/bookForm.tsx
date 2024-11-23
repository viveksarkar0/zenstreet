'use client'
import { IBooking } from '@/type/booking';
import React, { useState } from 'react';

interface IBookingFormProps {
  onCreate: (newBooking: IBooking) => void;
}

const BookingForm: React.FC<IBookingFormProps> = ({ onCreate }) => {
  const [userId, setUserId] = useState<number>(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: IBooking = { userId, startTime, endTime };
    onCreate(newBooking);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a Booking</h2>

      <div className="mb-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          id="endTime"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Booking
      </button>
    </form>
  );
};

export default BookingForm;
