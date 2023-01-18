import type { BookingType } from '../components/BookingModal';
import styles from './DeleteModal.module.css';
import React, { useEffect, useRef } from 'react';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { api } from '../utils/api';
import { Icons } from '../assets/svgs';
import { RentalLocations } from '../components/BookingModal';
import { toast } from 'react-toastify';

const DeleteModal = ({ booking, onClose, refetch }: { booking: BookingType, onClose: () => void, refetch: () => void }) => {
  const deleteBooking = api.bookings.deleteBooking.useMutation();
  const modalRef = useRef(null);
  const rentalLocation = Object.keys(RentalLocations)[booking.rentalLocationId! - 1]?.split('_').join(' ').toUpperCase() ?? ''

  useOnClickOutside([modalRef], onClose);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDelete = () => {
    deleteBooking.mutate({ id: booking.id });
  }

  useEffect(() => {
    if (deleteBooking.isSuccess) {
      toast('Booking deleted');
      refetch();
      onClose();
    } else if (deleteBooking.error) toast.error('An error has occurred, please try again');
  }, [deleteBooking, onClose, refetch])

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div onClick={onClose} style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          {Icons.Close}
        </div>
        <h3>Are you sure you want to delete this booking?</h3>
        <div className={styles.row} style={{ marginTop: '2rem' }}>
          <b>Name: </b>
          {`${booking.firstName} ${booking.lastName}`}
        </div>
        <div className={styles.row}>
          <b>Email: </b>
          {booking.email}
        </div>
        <div className={styles.row}>
          <b>Phone: </b>
          {booking.phoneNumber}
        </div>
        <div className={styles.row}>
          <b>Rental location: </b>
          {rentalLocation}
        </div>
        <div className={styles.row}>
          <b>Check in date: </b>
          {booking.checkInDate}
        </div>
        <div className={styles.row}>
          <b>Check out date: </b>
          {booking.checkOutDate}
        </div>
        <div className={styles.buttonDiv}>
          <button type='button' className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
          <button type='button' className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;