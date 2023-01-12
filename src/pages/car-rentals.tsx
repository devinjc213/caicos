import styles from '../styles/car-rentals.module.css';
import RentalCompany from 'src/components/RentalCompany';

const CarRentals = () => {
  return (
    <div className={styles.main}>
      <h2>Ready for an adventure? Rent a car to explore North & Middle Caicos</h2>
      <p>
        Middle Caicos is the largest island of the Turks & Caicos, followed by North Caicos. With so much ground to
        cover, you{"'"}ll need a vehicle to get around the islands. Here are our preferred car rental companies based on
        North Caicos, where you can pick up your vehicle as soon as you step foot off the ferry at Sandy Point — and
        let the adventure begin.
      </p>
      <div className={styles.companies}>
        <RentalCompany
          img='/assets/turqoise.png'
          title='Turquoise Rent A Car'
          website='turquoisecarrental.com'
          email='info@turquoisecarrental.com'
          phone='(649) 231-3967'
          buttonText='Book Turquoise Rent A Car'
          buttonLink='https://www.turquoisecarrental.com/contact_us.php'
        />
        <RentalCompany
          img='/assets/als.png'
          title={`Al's Rent A Car`}
          website='alsrentacar.com'
          email='reservations@alsrentacar.com'
          phone='(649) 241-1276 | (649) 345-7422'
          buttonText={`Book Al's Rent A car`}
          buttonLink='https://www5.rentcentric.com/Client6874/WebCustomer/WebCustomer.aspx'
        />
        <RentalCompany
          img='/assets/superior.png'
          title='Superior Auto Rentals'
          website='superiorautorentals.com'
          email='info@superautorentals.com'
          phone='(649) 232-2137 | (649) 343-5220'
          buttonText='Book Superior Auto Rentals'
          buttonLink='http://www.superiorautorentals.com/contact-us/'
        />
      </div>
    </div>
  );
}

export default CarRentals;