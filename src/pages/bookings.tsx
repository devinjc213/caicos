import { api } from '../utils/api';
import styles from 'src/styles/bookings.module.css';
import type { BookingType} from '../components/BookingModal';
import { RentalLocations } from '../components/BookingModal';
import React, { useState } from 'react';
import DeleteModal from '../components/DeleteModal';

const Gear = (
  <svg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M7.50851 0.5C8.09654 0.506508 8.68224 0.571739 9.25616 0.694647C9.50675 0.748301 9.69413 0.948855 9.72257 1.19382L9.85892 2.36832C9.92061 2.90759 10.3948 3.31604 10.9601 3.31661C11.112 3.31684 11.2624 3.28645 11.4028 3.2268L12.5249 2.75351C12.7583 2.65507 13.0309 2.70874 13.2051 2.88741C14.016 3.71896 14.6199 4.71628 14.9714 5.80431C15.0471 6.03892 14.96 6.29388 14.754 6.43963L13.7594 7.14356C13.4757 7.34371 13.3081 7.66156 13.3081 7.99963C13.3081 8.33764 13.4757 8.65548 13.7601 8.8561L14.7555 9.56025C14.9615 9.70595 15.0488 9.96095 14.973 10.1956C14.6217 11.2835 14.0181 12.2807 13.2077 13.1124C13.0336 13.291 12.7611 13.3449 12.5278 13.2466L11.4012 12.7727C11.0789 12.6373 10.7087 12.6571 10.4041 12.8262C10.0995 12.9952 9.89674 13.2933 9.85804 13.629L9.72257 14.8034C9.69469 15.0456 9.51132 15.2448 9.26449 15.3012C8.10407 15.5663 6.8951 15.5663 5.73474 15.3012C5.48789 15.2448 5.30454 15.0456 5.27661 14.8034L5.14136 13.6308C5.10164 13.2956 4.89861 12.9985 4.59425 12.83C4.28989 12.6616 3.92033 12.6418 3.59908 12.7765L2.4722 13.2505C2.23879 13.3487 1.96626 13.2949 1.79222 13.1161C0.981356 12.2835 0.377767 11.285 0.0268762 10.196C-0.0486936 9.96149 0.0386287 9.70664 0.244501 9.56102L1.24056 8.85641C1.52427 8.65625 1.69183 8.3384 1.69183 8.0004C1.69183 7.66233 1.52427 7.34448 1.24019 7.14409L0.244757 6.44067C0.0385725 6.29498 -0.0488298 6.03984 0.0270123 5.80508C0.378504 4.71705 0.982413 3.71973 1.79329 2.88818C1.96751 2.70951 2.24017 2.65584 2.47354 2.75428L3.59541 3.22748C3.91822 3.36352 4.28932 3.34297 4.59532 3.17131C4.90001 3.00161 5.10285 2.70325 5.14201 2.36742L5.27826 1.19382C5.30672 0.948732 5.49426 0.748108 5.74497 0.69457C6.31957 0.571862 6.90591 0.506654 7.50851 0.5ZM7.4985 5.69228C6.1712 5.69228 5.09517 6.72548 5.09517 8.00002C5.09517 9.27448 6.1712 10.3077 7.4985 10.3077C8.82588 10.3077 9.90186 9.27448 9.90186 8.00002C9.90186 6.72548 8.82588 5.69228 7.4985 5.69228Z' fill='#9B9EA8' />
  </svg>
);

const CloseIcon = (
  <svg width='12' height='12' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path opacity='1' d='M1 1L4 4M4 4L1 7M4 4L7 1M4 4L7 7' stroke='red' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<BookingType>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const bookings = api.bookings.getAllBookings.useQuery();

  const handleDelete = (booking: BookingType) => {
    setSelectedBooking(booking)
    setShowDeleteModal(true);
  };

  const handleEdit = () => {};

  return (
    <div className={styles.main}>
      <h1>Manage bookings</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Rental property</th>
          <th>Check in date</th>
          <th>Check out date</th>
          <th>Edit</th>
        </tr>
        {bookings.isSuccess && bookings.data.map((booking: BookingType) => (
          <tr key={booking.id}>
            <td>{`${booking.firstName} ${booking.lastName}`}</td>
            <td>{booking.email}</td>
            <td>{booking.phoneNumber}</td>
            <td>{Object.keys(RentalLocations)[booking.rentalLocationId! - 1]?.split('_').join(' ').toUpperCase()}</td>
            <td>{booking.checkInDate}</td>
            <td>{booking.checkOutDate}</td>
            <td>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>{Gear}</div>
                <div onClick={() => handleDelete(booking)}>{CloseIcon}</div>
              </div>
            </td>
          </tr>
        ))}
      </table>
      {showDeleteModal && selectedBooking && <DeleteModal booking={selectedBooking} onClose={() => setShowDeleteModal(false)} />}
      {showEditModal && selectedBooking && <EditModal booking={selectedBooking} onClose={() => setShowEditModal(false)} />}
    </div>
  );
}

export default Bookings;