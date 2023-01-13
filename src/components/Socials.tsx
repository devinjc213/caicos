import styles from 'src/styles/contact.module.css';
import Image from 'next/image';

const Socials = () => {
  return (
    <div className={styles.socials}>
      <a href='https://www.instagram.com/northandmiddle/' target='_blank' rel='noreferrer'>
        <Image src='/assets/instagram.png' width='50' height='50' alt='instagram' />
      </a>
      <a href='https://www.facebook.com/northandmiddlecaicos/' target='_blank' rel='noreferrer'>
        <Image src='/assets/facebook.png' width='50' height='50' alt='facebook' />
      </a>
    </div>
  );
}

export default Socials;