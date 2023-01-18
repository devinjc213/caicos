import { z } from 'zod';
import { DayRange } from '@amir04lm26/react-modern-calendar-date-picker';

type FormValidationType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  selectedDayRange: DayRange
}


export const isLeapYear = (year: number) => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

export const getDaysInMonth = (year: number, checkInMonth: number) => {
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

export const formValidator = ({ firstName, lastName, email, phoneNumber, selectedDayRange }: FormValidationType) => {
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
    valid: validEmail && validFirstName && validLastName && validEmail && validPhoneNumber && validDates,
    result: {
      firstNameValid: validFirstName,
      lastNameValid: validLastName,
      emailValid: validEmail,
      phoneNumberValid: validPhoneNumber,
      datesValid: validDates
    }
  }
}