"use client"
import BookingForm from '@/components/bookForm';
import BookingList from '@/components/bookList';
import { IBooking } from '@/type/booking';
import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateBooking = async (newBooking: IBooking) => {
    try {
      const response = await fetch('http://localhost:3000/api/bookings/add', {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        alert('Booking created successfully!');
        setShowForm(false); // Close form after successful booking
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking');
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Booking System</h1>
      
      {/* Button to toggle form visibility */}
      <button
        onClick={toggleForm}
        className="mb-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {showForm ? 'Cancel' : 'Create Booking'}
      </button>

      {/* Modal Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <button
              onClick={toggleForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <span className="text-xl">&times;</span>
            </button>
            <BookingForm onCreate={handleCreateBooking} />
          </div>
        </div>
      )}

      <BookingList />
    </div>
  );
};

export default HomePage;
