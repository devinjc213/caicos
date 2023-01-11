import Image from 'next/image';
import styles from './rental-company.module.css';

interface RentalCompanyInterface {
  img: string
  title: string
  website: string
  email: string
  phone: string
  buttonText: string
  buttonLink: string
}

const RentalCompany = ({ img, title, website, email, phone, buttonText, buttonLink }: RentalCompanyInterface) => {
  return (
    <div className={styles.main}>
      <Image src={img} height='300' width='300' alt='rental company' />
      <h2>{title}</h2>
      <a href={website} target='_blank' rel='noreferrer'>{website}</a>
      <span>Email: {email}</span>
      <span>Phone: {phone}</span>
      <a
        href={buttonLink}
        target='_blank'
        rel='noreferrer'
        style={{ border: '1px solid #253551', padding: '2rem', textDecoration: 'none' }}
        >
        {buttonText}
      </a>
    </div>
  );
}

export default RentalCompany;