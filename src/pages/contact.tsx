import Image from 'next/image';
import type { NextPage } from 'next';

import styles from '../styles/contact.module.css';

const Contact: NextPage = () => {
  return (
    <>
      <div className={styles.main}>
        <Image src='/assets/contact.jpg' layout='responsive' width='750' height='500' alt='contact' />
        <div>
          <h2 style={{ fontSize: '50.5px'}}>Have Questions?<br />Need recommendations?<br />Get in touch.</h2>
          <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.25rem' }}>
            Planning a trip to North Caicos & Middle Caicos? We can help. Contact us at
            {' '}
            <a href='mailto:northandmiddlecaicos@gmail.com'>
              northandmiddlecaicos@gmail.com
            </a>
            {' '}
            for all your North & Middle inquiries.
          </div>
          <div style={{ textAlign: 'center', fontSize: '1.25rem' }}>
            Connect with us on
            {' '}
            <a href='https://www.facebook.com/northandmiddlecaicos/' target='_blank' rel='noreferrer'>
              Facebook
            </a>
            {' '}
            and
            {' '}
            <a href='https://www.instagram.com/northandmiddle/' target='_blank' rel='noreferrer'>
              Instagram
            </a>
            {' '}
            for a daily taste of island life.
          </div>
        </div>
      </div>
      <div className={styles.socials}>
        <a href='https://www.instagram.com/northandmiddle/' target='_blank' rel='noreferrer'>
          <Image src='/assets/instagram.png' width='50' height='50' alt='instagram' />
        </a>
        <a href='https://www.facebook.com/northandmiddlecaicos/' target='_blank' rel='noreferrer'>
          <Image src='/assets/facebook.png' width='50' height='50' alt='facebook' />
        </a>
      </div>
    </>
  );
}

export default Contact;