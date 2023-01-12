import { useOnClickOutside } from '../hooks/useClickOutside';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Day, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from './BookingModal.module.css';
import { api } from '../utils/api';
import { z, ZodError } from 'zod';

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

const isLeapYear = (year: number) => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

const getDaysInMonth = (year: number, checkInMonth: number) => {
  const dateObj = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 31,
    7: 30,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  return Object.values(dateObj)[checkInMonth - 1];
}

type ValidationErrorType = { [x: string]: string[] | undefined; [x: number]: string[] | undefined; [x: symbol]: string[] | undefined; }

const FormValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.number(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  rentalLocationId: z.number()
})

const BookingModal = ({ location, onClose }: { location: RentalLocationsType, onClose: () => void }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [validationError, setValidationError] = useState<ValidationErrorType>();
  const [blackoutDays, setBlackoutDays] = useState<Day[]>([]);
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const modalRef = useRef(null);
  const mutation = api.bookings.createBooking.useMutation();
  const existingBookings = api.bookings.getBookingsAtLocation.useQuery({ id: RentalLocations[location] });

  useOnClickOutside([modalRef], onClose);

  useEffect(() => {
    const blockDateArray: Day[] = [];

    existingBookings?.data?.map((bookings) => {
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
      } else if (checkOutYear - checkInYear === 0 && checkOutMonth - checkInMonth > 0) {
        for (let i = checkInDay; i <= daysInCheckInMonth!; i++) {
          blockDateArray.push({ year: checkInYear, month: checkInMonth, day: i });
        }
        for (let i = 1; i <= checkOutDay; i ++) {
          blockDateArray.push({ year: checkInYear, month: checkOutMonth, day: i });
        }
      } else if (checkOutYear - checkInYear > 0) {
        for (let i = checkInDay; i <= daysInCheckInMonth!; i++) {
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

  const handleSubmit = useCallback(() => {
    if (!email || !phoneNumber || !selectedDayRange.to || !selectedDayRange.from || !location) return;

    const checkInDate = `${selectedDayRange.from.year}-${selectedDayRange.from.month}-${selectedDayRange.from.day}`;
    const checkOutDate = `${selectedDayRange.to.year}-${selectedDayRange.to.month}-${selectedDayRange.to.day}`;
    const rentalLocationId = RentalLocations[location];

    try {
      const valid = FormValidation.parse({ firstName, lastName, email, phoneNumber, checkInDate, checkOutDate, rentalLocationId });
      if (valid) {
      }
    } catch (e) {
      if (e instanceof ZodError) {
        const err = e.flatten();
        setValidationError(err.fieldErrors);
      } else {
        throw e;
      }
    }
      mutation.mutate({ firstName, lastName, email, phoneNumber: phoneNumber.toString(), checkInDate, checkOutDate, rentalLocationId });
  }, [email, phoneNumber, selectedDayRange, firstName, lastName, location, mutation]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3 style={{ margin: '0 0 3rem 0'}}>{location && location?.replace(/_/g, ' ').toUpperCase()}</h3>
        <div className={styles.formAndDate}>
          <div style={{ display: 'grid' }}>
            <div className={styles.inputAndLabel}>
              <label style={{ fontSize: '0.75rem' }}>First name:</label>
              <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className={styles.inputAndLabel}>
              <label style={{ fontSize: '0.75rem' }}>Last name:</label>
              <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className={styles.inputAndLabel}>
              <label style={{ fontSize: '0.75rem' }}>Email:</label>
              <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputAndLabel}>
              <label style={{ fontSize: '0.75rem' }}>Phone number:</label>
              <input type='number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value as unknown as number)} />
            </div>
            <button onClick={handleSubmit} className={styles.submitButton} type='submit'>Book now</button>
          </div>
          <Calendar
            value={selectedDayRange}
            minimumDate={utils('en').getToday()}
            maximumDate={{ year: 2024, month: 2, day: 28 }}
            onChange={(val) => setSelectedDayRange({ from: val?.from, to: val?.to })}
            disabledDays={blackoutDays}
            shouldHighlightWeekends
          />
        </div>
        {validationError && (
          <div className={styles.errorMessage}>
            Error: {Object.values(validationError).join('; ')}
          </div>
        )}
      </div>
    </div>

  )
}

export default BookingModal;