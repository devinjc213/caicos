import { useOnClickOutside } from '../hooks/useClickOutside';
import { useRef, useEffect, useState } from 'react';
import { Calendar, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from './BookingModal.module.css';
import { api } from "../utils/api";

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

const BookingModal = ({ location, onClose }: { location: RentalLocationsType, onClose: () => void }) => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const modalRef = useRef(null);
  const mutation = api.bookings.createBooking.useMutation();

  useOnClickOutside([modalRef], onClose);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (mutation.error) console.log(mutation.error);

  const handleSubmit = () => {
    if (!email || !phone || !selectedDayRange.to || !selectedDayRange.from || !location) return;
    const checkInDate = new Date(selectedDayRange.from.year, selectedDayRange.from.month - 1, selectedDayRange.from.day);
    const checkOutDate = new Date(selectedDayRange.to.year, selectedDayRange.to.month - 1, selectedDayRange.to.day);

    mutation.mutate({ email, phoneNumber: phone, checkInDate, checkOutDate, rentalLocationId: RentalLocations[location] });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3 style={{ margin: '0 0 3rem 0'}}>{location && location?.replace(/_/g, ' ').toUpperCase()}</h3>
        <div className={styles.formAndDate}>
          <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
            <label>Phone number:</label>
            <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
            <button type='submit'>Book now</button>
          </form>
          <Calendar
            value={selectedDayRange}
            onChange={(val) => setSelectedDayRange({ from: val?.from, to: val?.to })}
            shouldHighlightWeekends
          />
        </div>
      </div>
    </div>

  )
}

export default BookingModal;