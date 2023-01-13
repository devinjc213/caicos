import Image from 'next/image';
import type { NextPage } from 'next';

import styles from '../styles/contact.module.css';
import Socials from '../components/Socials';

const Contact: NextPage = () => {
  return (
    <>
      <div className={styles.main}>
        <Image src='/assets/contact.jpg' layout='responsive' width='750' height='500' alt='contact' />
        <div className={styles.header}>
          <h1>Have Questions?<br />Need recommendations?<br />Get in touch.</h1>
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
      <Socials />
    </>
  );
}

export default Contact;