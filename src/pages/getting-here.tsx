import Image from 'next/image';
import styles from 'src/styles/getting-here.module.css';
import Link from 'next/link';

const GettingHere = () => {
  return (
    <div>
      <Image
        src='/assets/getting-here/getting-here-header.jpg'
        width='2500'
        height='1650'
        alt='header'
        layout='responsive'
        style={{ maxHeight: '520px', maxWidth: '100vw', objectFit: 'cover', filter: 'brightness(80%)' }}
      />
      <div className={styles.main}>
        <h1>How to Get to North & Middle Caicos</h1>
        <hr style={{ marginBottom: '2rem' }} />
        <h2>Book your flight to PLS</h2>
        <p>
          Providenciales (airport code PLS) is the international gateway to the Turks & Caicos. There are direct
          flights to Providenciales (also known as Provo) from many major cities, including New York, Toronto, Miami
          and London. With a population of about 30,000, Provo is the busiest island in the Turks & Caicos, home to
          many luxury villas and high-end resorts. You can split your time between islands to experience the best of
          both worlds in the Turks & Caicos, or spend your vacation exclusively on North and Middle Caicos for a more
          peaceful, off-the-beaten-path experience.
        </p>
        <h2>Catch the ferry to North Caicos</h2>
        <p>
          Caribbean Cruisin
          {' '}
          <a href='https://tciferry.tciferry.com/' target='_blank' rel='noreferrer'>
            offers a daily ferry service
          </a>
          {' '}
          from Provo to North Caicos operating out of Walkin Marina.
          Unless you’ve rented a car during your stay on Provo, you’ll need a taxi to get you to the dock, which is
          located on the eastern side of the island. If you’re heading straight to the ferry dock from the airport,
          bear in mind the last ferry leaves no later than 5pm. Tickets are $55 roundtrip and can be purchased
          {' '}
          <a
            href='https://tciferry.tciferry.com/booking/?s=MToyMDIwLTAyLTE4OjIwMjAtMDItMTg6MTowOjA6UHJvdmlkZW5jaWFsZXM6Tm9ydGggQ2FpY29zOjA6MDo6OjA6OjowOjo%3D'
            target='_blank'
            rel='noreferrer'
          >
            online
          </a>
          {' '}
          or at the marina office. (<em>Tip: If you’re planning to travel on dates that coincide with an event on North
          Caicos or Middle Caicos, be sure to book your tickets ahead of time — the boats fill up fast.</em>)
        </p>
        <h2>Book a car</h2>
        <p>
          Despite their seclusion and small populations, North and Middle Caicos are the two largest islands in the
          Turks & Caicos totaling 100 square miles. It takes an hour to drive from Sandy Point on North Caicos to Wild
          Cow Run — the end of Middle Caicos — without stopping. And trust us, you’ll be making plenty of stops to soak
          in all the sights of North and Middle. Simply put: You’ll need a vehicle to get around. Book a car ahead of
          time from one of
          {' '}
          <Link href='/car-rentals'>
            our preferred car rental companies
          </Link>
          , who will meet you upon arrival at Sandy Point.
        </p>
      </div>
      <div className={styles.textOverPic}>
        <Image
          src='/assets/getting-here/getting-here-footer.jpg'
          width='2500'
          height='1650'
          alt='header'
          layout='responsive'
          style={{ maxHeight: '520px', maxWidth: '100vw', objectFit: 'cover', marginTop: "5rem", zIndex: "-1" }}
        />
        <div className={styles.text}>
          <h2>There{"'"}s only one question left:</h2>
          <h2>What are you waiting for?</h2>
        </div>
      </div>
    </div>
  );
}

export default GettingHere;