import styles from 'src/components/rental-location.module.css';
import Image from 'next/image';

interface RentalLocationInterface {
  title: string
  img: string
  location: string
  description: string
}

const RentalLocation = ({ title, img, location, description }: RentalLocationInterface) => {
  return (
    <div className={styles.main} style={{ maxWidth: '478px' }}>
      <h2>{title}</h2>
      <div className={styles.bookImg}>
        <Image src={img} width='473' height='378' alt='rental location' />
        <div className={styles.bookNow}>Book now</div>
        <em>{location}</em>
      </div>
      <p style={{ fontSize: '1rem', textAlign: 'center' }}>{description}</p>
    </div>
  );
}

export default RentalLocation;