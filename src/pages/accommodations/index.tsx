import Image from 'next/image';
import styles from '../../styles/accommadations.module.css';
import RentalLocation from '../../components/RentalLocation';
import { useState } from 'react';
import type { RentalLocations } from '../../components/BookingModal';
import BookingModal from '../../components/BookingModal';

const Accommodations = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<RentalLocations>(null);

  return (
    <>
      <div className={styles.header}>
        <Image
          src='/assets/accommodations/header.jpg'
          width='2500'
          height='1667'
          alt='accommodation'
          style={{ maxHeight: '520px', maxWidth: '100vw', objectFit: 'cover', zIndex: '-1', filter: 'brightness(80%)' }}
        />
        <h2 className={styles.textOverPic}>
          Find where to stay on North & Middle Caicos from our collection of preferred homes and villas.
        </h2>
      </div>
      <div className={styles.main}>
        <RentalLocation
          title='Bottle Creek Retreat'
          img='/assets/accommodations/bottlecreek.jpg'
          location='Bottle Creek, North Caicos'
          description='You have the option of renting either a private room, or an entire one-bedroom apartment with
          a private deck and BBQ. Bicycles, kayaks and paddleboards are available for exploring Bottle Creek, which is
          just a short walk away from the house.'
          onClick={() => {
            setLocation('bottle_creek_retreat');
            setShowModal(true);
          }}
        />
        <RentalLocation
          title='Empyrean Villas'
          img='/assets/accommodations/empyrean.jpg'
          location='Whitby, North Caicos'
          description='These two villas each boast two bedrooms and two bathrooms, as well as a dipping pool and full
          seat of beach chairs. Surrounded by lush vegetation, these homes are ultra private and a short walk from
          Silver Palm Restaurant (open seasonally).'
          onClick={() => {
            setLocation('empyrean_villas');
            setShowModal(true);
          }}
        />
        <RentalLocation
          title='Datai Villa'
          img='/assets/accommodations/datai.jpg'
          location='Whitby Beach, North Caicos'
          description='This three-bedroom, three-bathroom villa is located right on the beach in Whitby. Your stay
          includes the use of kayaks, bicycles, an outdoor grill, plenty of outdoor seating and a relaxing hammock for
          an idyllic island getaway.'
          onClick={() => {
            setLocation('datai_villas');
            setShowModal(true);
          }}
        />
        <RentalLocation
          title='Royal Hideaway'
          img='/assets/accommodations/royal.jpg'
          location='Bambarra, Middle Caicos'
          description='A two-minute walk from Bambarra Beach, Royal Hideaway offers two bedrooms, two-and-a-half
          bathrooms and bicycles for getting around the island. Kayaks, paddleboards and ATV’s are also included in
          your stay.'
          onClick={() => {
            setLocation('royal_hideaway');
            setShowModal(true);
          }}
        />
        <RentalLocation
          title='Sundial Villas'
          img='/assets/accommodations/sundial.jpg'
          location='Bambarra Beach, Middle Caicos'
          description='This two-bedroom, three-bathroom home sits on the pristine shores of Bambarra Beach. Your stay
          at Sundial includes snorkel gear, umbrellas and beach toys for kids. The home includes plenty of outdoor
          living space (including a screened-in porch).'
          onClick={() => {
            setLocation('sundial_villas');
            setShowModal(true);
          }}
        />
        <RentalLocation
          title='Dragon Cay Resort'
          img='/assets/accommodations/dragoncay.jpg'
          location='Mudjin Harbor, Middle Caicos'
          description='Dragon Cay Resort offers a collection of homes at the crown jewel of Middle Caicos — Mudjin
          Harbor. Accommodations range from studio cottages to a three-bedroom villa. All homes are a short walk from
          the beach and Mudjin Bar & Grill.'
          onClick={() => {
            setLocation('dragon_cay_resort');
            setShowModal(true);
          }}
        />
        <RentalLocation
          title='Creek View Cottage'
          img='/assets/accommodations/creekview.jpg'
          location='Bottle Creek, North Caicos'
          description='An eco-conscious bungalow that looks over Bottle Creek, this studio comes with two twin beds,
          a private bathroom and outdoor shower. Cook dinner outdoors on the grill. If you love swimming, fishing and
          kayaking — this is the place for you.'
          onClick={() => {
            setLocation('creek_view_cottage');
            setShowModal(true);
          }}
        />
      </div>
      {showModal && location && <BookingModal location={location} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Accommodations;