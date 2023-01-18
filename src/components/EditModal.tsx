import type { BookingType } from '../components/BookingModal';
import styles from './EditModal.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { api } from '../utils/api';
import { Icons } from '../assets/svgs';
import { FormValidationType, RentalLocations } from '../components/BookingModal';
import type { DayRange} from '@amir04lm26/react-modern-calendar-date-picker';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import { useGetBlackoutDays } from '../hooks/useGetBlackoutDays';
import { toast } from "react-toastify";
import { formValidator } from '../utils/helpers';
import Input from '../components/Input';

const EditModal = ({ booking, onClose, refetch  }: { booking: BookingType, onClose: () => void, refetch: () => void }) => {
  const [firstName, setFirstName] = useState<string>(booking.firstName);
  const [lastName, setLastName] = useState<string>(booking.lastName);
  const [email, setEmail] = useState<string>(booking.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(booking.phoneNumber);
  const edit = api.bookings.editBooking.useMutation();

  const { checkInDate, checkOutDate } = booking;
  const inYear = Number(checkInDate.split('-')[0]);
  const inMonth = Number(checkInDate.split('-')[1]);
  const inDay = Number(checkInDate.split('-')[2]);
  const outYear = Number(checkOutDate.split('-')[0]);
  const outMonth = Number(checkOutDate.split('-')[1]);
  const outDay = Number(checkOutDate.split('-')[2]);
  const initialDayRange = {
    from: {
      year: inYear, month: inMonth, day: inDay
    },
    to: {
      year: outYear, month: outMonth, day: outDay
    }
  }

  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>(initialDayRange);
  const blackoutDays = useGetBlackoutDays(booking.rentalLocationId ?? 0, initialDayRange);
  const modalRef = useRef(null);
  useOnClickOutside([modalRef], onClose);

  const [valid, setValid] = useState<FormValidationType>({
    valid: true,
    result: {
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      phoneNumberValid: true,
      datesValid: true
    }
  });

  const handleEdit = () => {
    const validation = formValidator({ firstName, lastName, email, phoneNumber, selectedDayRange: initialDayRange })
    setValid(validation);

    const inDate = selectedDayRange.from && `${selectedDayRange.from.year}-${selectedDayRange.from?.month}-${selectedDayRange.from?.day}`;
    const outDate = selectedDayRange.to && `${selectedDayRange.to.year}-${selectedDayRange.to.month}-${selectedDayRange.to.day}`;

    if (validation.valid && inDate && outDate) {
      edit.mutate({ id: booking.id, firstName, lastName, email, phoneNumber, checkInDate: inDate, checkOutDate: outDate, rentalLocationId: booking.rentalLocationId! })
    }
  };

  useEffect(() => {
    if (edit.isSuccess) {
      toast('Booking updated');
      refetch();
      onClose();
    } else if (edit.error) toast.error('An error has occurred, please try again');
  }, [edit, onClose, refetch])

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
        <div onClick={onClose} style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}>
          {Icons.Close}
        </div>
        <h3>Edit booking</h3>
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.row}>
              <Input label='First name' value={firstName} onChange={e => setFirstName(e.target.value)} invalid={!valid.result.firstNameValid} />
              <Input label='Last name' value={lastName} onChange={e => setLastName(e.target.value)} invalid={!valid.result.lastNameValid} />
            </div>
            <div className={styles.row}>
              <Input label='Email' value={email} onChange={e => setEmail(e.target.value)} invalid={!valid.result.emailValid} />
              <Input
                label='Phone number'
                value={phoneNumber ? phoneNumber.toString() : ''}
                onChange={e => setPhoneNumber(e.target.value)}
                invalid={!valid.result.phoneNumberValid}
              />
            </div>
            <div className={styles.row} style={{ justifyContent:  'center' }}>
              <b>{Object.keys(RentalLocations)[(booking.rentalLocationId ?? 0) - 1]?.split('_').join(' ').toUpperCase()}</b>
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
          <button type='button' className={styles.confirmBtn} onClick={handleEdit}>Confirm</button>
          <button type='button' className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;