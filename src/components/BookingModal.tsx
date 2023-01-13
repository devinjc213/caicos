import { useOnClickOutside } from '../hooks/useClickOutside';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Day, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from './BookingModal.module.css';
import { api } from '../utils/api';
import { z, ZodError } from 'zod';
import { getDaysInMonth } from '../utils/helpers';
import Input from '../components/Input';

export type RentalLocationsType = 'bottle_creek_retreat'
  | 'empyrean_villas'
  | 'datai_villas'
  | 'royal_hideaway'
  | 'sundial_villas'
  | 'dragon_cay_resort'
  | 'creek_view_cottage'

const RentalLocations = {
  'bottle_creek_retreat':  1,
  'empyrean_villas': 2,
  'datai_villas': 3,
  'royal_hideaway': 4,
  'sundial_villas': 5,
  'dragon_cay_resort': 6,
  'creek_view_cottage': 7
}

type BookingType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  checkInDate: string
  checkOutDate: string
  rentalLocationId: number | null
}

type FormValidationType = {
  firstNameValid: boolean
  lastNameValid: boolean
  emailValid: boolean
  phoneNumberValid: boolean
  datesValid: boolean
}

const CloseIcon = (
  <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path opacity='1' d='M1 1L4 4M4 4L1 7M4 4L7 1M4 4L7 7' stroke='black' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const BookingModal = ({ location, onClose }: { location: RentalLocationsType, onClose: () => void }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [blackoutDays, setBlackoutDays] = useState<Day[]>([]);
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const [valid, setValid] = useState<FormValidationType>({
    firstNameValid: true,
    lastNameValid: true,
    emailValid: true,
    phoneNumberValid: true,
    datesValid: true
  });
  const modalRef = useRef(null);
  const mutation = api.bookings.createBooking.useMutation();
  const existingBookings = api.bookings.getBookingsAtLocation.useQuery({ id: RentalLocations[location] });

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
    const blockDateArray: Day[] = [];

    existingBookings?.data?.map((bookings: BookingType) => {
      const {checkInDate, checkOutDate} = bookings;
      const checkInDay = Number(checkInDate.split('-')[2]);
      const checkInMonth = Number(checkInDate.split('-')[1]);
      const checkInYear = Number(checkInDate.split('-')[0]);

      const checkOutDay = Number(checkOutDate.split('-')[2]);
      const checkOutMonth = Number(checkOutDate.split('-')[1]);
      const checkOutYear = Number(checkOutDate.split('-')[0]);

      const daysInCheckInMonth = getDaysInMonth(checkInYear, checkInMonth);
      
      if (checkOutYear - checkInYear === 0 && checkOutMonth - checkInMonth === 0) {
        for (let i = checkInDay; i <= checkOutDay + 1; i++) {
          blockDateArray.push({ year: checkInYear, month: checkInMonth, day: i });
        }
      } else if (checkOutYear - checkInYear === 0 && checkOutMonth - checkInMonth > 0 && daysInCheckInMonth) {
        for (let i = checkInDay; i <= daysInCheckInMonth; i++) {
          blockDateArray.push({ year: checkInYear, month: checkInMonth, day: i });
        }
        for (let i = 1; i <= checkOutDay; i ++) {
          blockDateArray.push({ year: checkInYear, month: checkOutMonth, day: i });
        }
      } else if (checkOutYear - checkInYear > 0 && daysInCheckInMonth) {
        for (let i = checkInDay; i <= daysInCheckInMonth; i++) {
          blockDateArray.push({ year: checkInYear, month: checkInMonth, day: i });
        }
        for (let i = 1; i <= checkOutDay; i ++) {
          blockDateArray.push({ year: checkOutYear, month: checkOutMonth, day: i });
        }
      }
    });

    setBlackoutDays(blockDateArray);
  }, [existingBookings?.data]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleValidation = () => {
    const emailSchema = z.string().email();
    const emailTest = () => {
      try {
        const result = emailSchema.parse(email)
        if (result === email) return true;
      } catch (e) {
        return false;
      }
    }

    const validEmail = emailTest() ?? false;
    const validFirstName = firstName.length > 0;
    const validLastName = lastName.length > 0;
    const validPhoneNumber = phoneNumber ? phoneNumber.length >= 7 : false;
    const validDates = (!(selectedDayRange.from === null || selectedDayRange.to === null));

    return {
      firstNameValid: validFirstName,
      lastNameValid: validLastName,
      emailValid: validEmail,
      phoneNumberValid: validPhoneNumber,
      datesValid: validDates
    }
  }

  const handleSubmit = () => {
    const validation = handleValidation();
    setValid(validation);

    if (Object.values(validation).includes(false)) {
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
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ margin: '0 0 2rem 0'}}>{location && location?.replace(/_/g, ' ').toUpperCase()}</h3>
          <div onClick={onClose}>
            {CloseIcon}
          </div>
        </div>
        <div className={styles.formAndDate}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Input label='First name' value={firstName} onChange={e => setFirstName(e.target.value)} invalid={!valid.firstNameValid} />
            <Input label='Last name' value={lastName} onChange={e => setLastName(e.target.value)} invalid={!valid.lastNameValid} />
            <Input label='Email' value={email} onChange={e => setEmail(e.target.value)} invalid={!valid.emailValid} />
            <Input
              label='Phone number'
              value={phoneNumber ? phoneNumber.toString() : ''}
              onChange={e => setPhoneNumber(e.target.value)}
              invalid={!valid.phoneNumberValid}
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
            calendarClassName={!valid.datesValid ? styles.calendarInvalid : undefined}
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