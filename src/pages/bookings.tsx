import { api } from '../utils/api';
import styles from 'src/styles/bookings.module.css';
import type { BookingType} from '../components/BookingModal';
import { RentalLocations } from '../components/BookingModal';
import React, { useState } from 'react';
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';
import { Icons } from '../assets/svgs';

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<BookingType>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const bookings = api.bookings.getAllBookings.useQuery();

  const handleDelete = (booking: BookingType) => {
    setSelectedBooking(booking)
    setShowDeleteModal(true);
  };

  const handleEdit = (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  return (
    <div className={styles.main}>
      <h1>Manage bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Rental property</th>
            <th>Check in date</th>
            <th>Check out date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {bookings.isSuccess && bookings.data.map((booking: BookingType) => (
            <tr key={booking.id}>
              <td>{`${booking.firstName} ${booking.lastName}`}</td>
              <td>{booking.email}</td>
              <td>{booking.phoneNumber}</td>
              <td>{Object.keys(RentalLocations)[booking.rentalLocationId! - 1]?.split('_').join(' ').toUpperCase()}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div onClick={() => handleEdit(booking)} style={{ cursor: 'pointer' }}>{Icons.Gear}</div>
                  <div onClick={() => handleDelete(booking)} style={{ cursor: 'pointer' }}>{Icons.Close}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && selectedBooking && <DeleteModal booking={selectedBooking} onClose={() => setShowDeleteModal(false)} />}
      {showEditModal && selectedBooking && <EditModal booking={selectedBooking} onClose={() => setShowEditModal(false)} />}
    </div>
  );
}

export default Bookings;