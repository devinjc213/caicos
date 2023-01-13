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