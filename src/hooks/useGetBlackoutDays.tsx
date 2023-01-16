import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import type { Day, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { getDaysInMonth } from '../utils/helpers';
import type { BookingType } from '../components/BookingModal';

export const useGetBlackoutDays = (locationId: number, filterFromBlackout?: DayRange) => {
  const [blackoutDays, setBlackoutDays] = useState<Day[]>([]);
  const existingBookings = api.bookings.getBookingsAtLocation.useQuery({ id: locationId });

  const createFromToArray = (range: DayRange) => {
    const { to, from } = range;
    if (!to || !from) return;
    const blockDateArray: Day[] = [];
    const daysInCheckInMonth = getDaysInMonth(from.year, from.month);

    if (to.year - from.year === 0 && to.month - from.month === 0) {
      for (let i = from.day; i <= to.day + 1; i++) {
        blockDateArray.push({ year: from.year, month: from.month, day: i });
      }
    } else if (to.year - from.year === 0 && to.month - from.month > 0 && daysInCheckInMonth) {
      for (let i = from.day; i <= daysInCheckInMonth; i++) {
        blockDateArray.push({ year: from.year, month: from.month, day: i });
      }
      for (let i = 1; i <= to.day; i ++) {
        blockDateArray.push({ year: from.year, month: to.month, day: i });
      }
    } else if (to.year - from.year > 0 && daysInCheckInMonth) {
      for (let i = from.day; i <= daysInCheckInMonth; i++) {
        blockDateArray.push({ year: from.year, month: from.month, day: i });
      }
      for (let i = 1; i <= to.day; i ++) {
        blockDateArray.push({ year: to.year, month: to.month, day: i });
      }
    }

    return blockDateArray;
  }

  useEffect(() => {
    let blockDateArray: Day[] = [];

    existingBookings?.data?.map((bookings: BookingType) => {
      const {checkInDate, checkOutDate} = bookings;
      const dayRange = {
        from: {
          year: Number(checkInDate.split('-')[0]),
          month: Number(checkInDate.split('-')[1]),
          day: Number(checkInDate.split('-')[2])
        },
        to: {
          year: Number(checkOutDate.split('-')[0]),
          month: Number(checkOutDate.split('-')[1]),
          day: Number(checkOutDate.split('-')[2])
        }
      }

      const dateArray = createFromToArray(dayRange);

      if (!blockDateArray && dateArray) blockDateArray = dateArray;
      else if (blockDateArray && dateArray) blockDateArray = blockDateArray.concat(dateArray);
    });

    setBlackoutDays(blockDateArray);
  }, [existingBookings?.data]);

  if (filterFromBlackout) {
    const datesToFilter = createFromToArray(filterFromBlackout);

    return blackoutDays.filter((date) => !datesToFilter?.some((filter) => {
      return filter.day === date.day && filter.month === date.month && filter.year === date.year
    }));
  } else {
    return blackoutDays;
  }
}