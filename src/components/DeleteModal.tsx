import type { BookingType } from '../components/BookingModal';
import styles from './DeleteModal.module.css';
import { useEffect, useRef } from 'react';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { api } from '../utils/api';

const DeleteModal = ({ booking, onClose  }: { booking: BookingType, onClose: () => void }) => {
  const deleteBooking = api.bookings.deleteBooking.useMutation();
  const modalRef = useRef(null);

  useOnClickOutside([modalRef], onClose);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3>Are you sure you want to delete this booking?</h3>
        <div>
          {`${booking.firstName} ${booking.lastName}`}
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;