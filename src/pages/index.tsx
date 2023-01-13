import styles from "src/styles/index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CenterBody from "public/assets/home/home-body.jpg";
import Map from "public/assets/home/home-map.png";
import Socials from '../components/Socials';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Explore North & Middle Caicos</title>
        <meta
          name="description" 
          content="Visiting Caicos and need the 411?  Look no further!  All the information you need for things to do, places to stay, and car rentals"
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h2>Welcome to the islands of</h2>
        <h1>North Caicos + Middle Caicos</h1>
        <Image
          src='/assets/home/home-header.jpg'
          width='1717'
          height='1145'
          alt="header"
          style={{ maxHeight: '620px', maxWidth: '100vw', objectFit: 'cover', filter: 'brightness(80%)' }}
        />
      </div>
      <div className={styles.main}>
        <h2>There{"'"}s something special about North & Middle Caicos.</h2>
        <p>
          While so many places in the world have become overrun by crowds and high-rises, there still exists a few magical places where time
          has stood still. Still pristine and untouched, ruggedly beautiful — the kind of place where life remains quiet and simple. In the
          Turks & Caicos Islands (TCI), you{"'"}ll find two islands that have managed to preserve much of the natural beauty that existed thousands
          of years before humans settled there. On a world map, they may appear to be nothing but tiny dots — but look closer, and you{"'"}ll
          discover a world of adventure. Visit the islands of North & Middle Caicos, and you{"'"}ll know exactly what we mean.
        </p>
        <Image src={CenterBody} objectFit='contain' alt="beach" />
        <p>
          Maybe it{"'"}s the laid-back lifestyle the islands embody. Maybe it{"'"}s the local charm, found in the colorful homes and warm friendliness of the
          people who live here. Maybe it{"'"}s the bountiful opportunities these islands offer to explorers and adventurers, the purest sense of peace
          they offer to those who need an escape.
        </p>
        <p>
          These two sister islands in TCI are collectively home to less than 2,000 people, yet together they make up most of the land mass in the
          chain of more than 40 islands that make up TCI. Here, you{"'"}ll find some of the most stunning vistas the islands have to offer, from the
          tranquil white sand beaches of North Caicos to the dramatic seaside cliffs at Mudjin Harbor on Middle Caicos.
        </p>
        <p>Welcome to the wild side of the Turks & Caicos.</p>
        <p>Come experience the magic of North & Middle Caicos.</p>
        <hr />
        <h2>Where in the world are we?</h2>
        <Image src={Map} alt='map' />
        <p>
          North Caicos and Middle Caicos are part of the island chain that make up the Turks & Caicos, which begs the
          question: Where are the Turks & Caicos, anyway?
        </p>
        <p>
          The Turks & Caicos are a chain of islands just southeast of the Bahamas. Geographically, they are part of the
          Lucayan (Bahama) Archipelago. But politically, they are an independent British Overseas Territory. And they’re
          easily accessible from North America. You can fly direct from Miami or Fort Lauderdale to Providenciales in
          less than two hours, or from New York in less than four hours.
        </p>
        <hr />
        <div style={{ textAlign: 'center' }}>
          <h2>Travel off the beaten path in the Turks & Caicos Islands</h2>
          <Socials />
        </div>
      </div>
    </>
  );
};

export default Home;
