import { useOnClickOutside } from '../hooks/useClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import type { Day, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from './BookingModal.module.css';
import { api } from '../utils/api';
import { z } from 'zod';
import Input from '../components/Input';
import { Icons } from '../assets/svgs';
import { useGetBlackoutDays } from '../hooks/useGetBlackoutDays';
import { toast } from 'react-toastify';
import { formValidator } from '../utils/helpers';

export type RentalLocationsType = 'bottle_creek_retreat'
  | 'empyrean_villas'
  | 'datai_villas'
  | 'royal_hideaway'
  | 'sundial_villas'
  | 'dragon_cay_resort'
  | 'creek_view_cottage'

export const RentalLocations = {
  'bottle_creek_retreat':  1,
  'empyrean_villas': 2,
  'datai_villas': 3,
  'royal_hideaway': 4,
  'sundial_villas': 5,
  'dragon_cay_resort': 6,
  'creek_view_cottage': 7
}

export type BookingType = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  checkInDate: string
  checkOutDate: string
  rentalLocationId: number | null
}

export type FormValidationType = {
  valid: boolean
  result: {
    firstNameValid: boolean
    lastNameValid: boolean
    emailValid: boolean
    phoneNumberValid: boolean
    datesValid: boolean
  }
}

const BookingModal = ({ location, onClose }: { location: RentalLocationsType, onClose: () => void }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
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
  const modalRef = useRef(null);
  const mutation = api.bookings.createBooking.useMutation();
  const blackoutDays = useGetBlackoutDays(RentalLocations[location]);

  useOnClickOutside([modalRef], onClose);

  useEffect(() => {
    if (mutation.isSuccess) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setSelectedDayRange({
        from: null,
        to: null
      });
      onClose();
    }
  }, [mutation, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = () => {
    const validation = formValidator({ firstName, lastName, email, phoneNumber: phoneNumber ?? '', selectedDayRange });
    setValid(validation);

    if (!validation.valid) {
      setShowError(true);
      return;
    } else {
      const checkInDate = selectedDayRange.from && `${selectedDayRange.from.year}-${selectedDayRange.from?.month}-${selectedDayRange.from?.day}`;
      const checkOutDate = selectedDayRange.to && `${selectedDayRange.to.year}-${selectedDayRange.to.month}-${selectedDayRange.to.day}`;
      const rentalLocationId = RentalLocations[location];

      if (firstName && lastName && email && phoneNumber && checkInDate && checkOutDate && rentalLocationId) {
        mutation.mutate({ firstName, lastName, email, phoneNumber, checkInDate, checkOutDate, rentalLocationId });
      }
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      toast(<div>Booking received<br />Please check your email for confirmation</div>);
      onClose();
    }
  }, [mutation, onClose]);
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ margin: '0 0 2rem 0'}}>{location && location?.replace(/_/g, ' ').toUpperCase()}</h3>
          <div onClick={onClose} style={{ cursor: 'pointer' }}>
            {Icons.Close}
          </div>
        </div>
        <div className={styles.formAndDate}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Input label='First name' value={firstName} onChange={e => setFirstName(e.target.value)} invalid={!valid.result.firstNameValid} />
            <Input label='Last name' value={lastName} onChange={e => setLastName(e.target.value)} invalid={!valid.result.lastNameValid} />
            <Input label='Email' value={email} onChange={e => setEmail(e.target.value)} invalid={!valid.result.emailValid} />
            <Input
              label='Phone number'
              value={phoneNumber ? phoneNumber.toString() : ''}
              onChange={e => setPhoneNumber(e.target.value)}
              invalid={!valid.result.phoneNumberValid}
            />
            <button onClick={handleSubmit} className={styles.submitButton} type='submit' disabled={mutation.isLoading}>Book now</button>
          </div>
          <Calendar
            value={selectedDayRange}
            minimumDate={utils('en').getToday()}
            maximumDate={{ year: 2024, month: 2, day: 28 }}
            onChange={(val: DayRange) => setSelectedDayRange({ from: val?.from, to: val?.to })}
            disabledDays={blackoutDays}
            shouldHighlightWeekends
            calendarClassName={!valid.result.datesValid ? styles.calendarInvalid : undefined}
          />
        </div>
        {showError && (
          <div className={styles.errorMessage}>
            Error: Please fix the highlighted fields.
          </div>
        )}
        {mutation.error && (
          <div className={styles.errorMessage}>
            An error has occurred booking your rental.  Please try again.
          </div>
        )}
      </div>
    </div>

  )
}

export default BookingModal;