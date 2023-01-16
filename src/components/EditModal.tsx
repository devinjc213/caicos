import type { BookingType } from '../components/BookingModal';
import styles from './EditModal.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { api } from '../utils/api';
import { Icons } from '../assets/svgs';
import { RentalLocations } from '../components/BookingModal';
import { Calendar, DayRange, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import { useGetBlackoutDays } from '../hooks/useGetBlackoutDays';

const EditModal = ({ booking, onClose  }: { booking: BookingType, onClose: () => void }) => {
  const [firstName, setFirstName] = useState<string>(booking.firstName);
  const [lastName, setLastName] = useState<string>(booking.lastName);
  const [email, setEmail] = useState<string>(booking.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(booking.phoneNumber);


  const { checkInDate, checkOutDate } = booking;
  const inYear = Number(checkInDate.split('-')[0]);
  const inMonth = Number(checkInDate.split('-')[1]);
  const inDay = Number(checkInDate.split('-')[2]);
  const outYear = Number(checkOutDate.split('-')[0]);
  const outMonth = Number(checkOutDate.split('-')[1]);
  const outDay = Number(checkOutDate.split('-')[2]);
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: {
      year: inYear, month: inMonth, day: inDay
    },
    to: {
      year: outYear, month: outMonth, day: outDay
    }
  });
  const blackoutDays = useGetBlackoutDays(booking.rentalLocationId ?? 0, selectedDayRange);
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
        <div onClick={onClose} style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          {Icons.Close}
        </div>
        <h3>Edit booking</h3>
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.row}>
              <b>First name: </b>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className={styles.row}>
              <b>Last name: </b>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className={styles.row}>
              <b>Email: </b>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.row}>
              <b>Phone: </b>
              <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className={styles.row}>
              <b>Check in date: </b>
              {booking.checkInDate}
            </div>
            <div className={styles.row}>
              <b>Check out date: </b>
              {booking.checkOutDate}
            </div>
          </div>
          <div className={styles.row}>
            <Calendar
              value={selectedDayRange}
              minimumDate={utils('en').getToday()}
              maximumDate={{ year: 2024, month: 2, day: 28 }}
              onChange={(val: DayRange) => setSelectedDayRange({ from: val?.from, to: val?.to })}
              disabledDays={blackoutDays}
              shouldHighlightWeekends
            />
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <button type='button' className={styles.confirmBtn}>Confirm</button>
          <button type='button' className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;