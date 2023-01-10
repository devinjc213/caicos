import styles from "src/styles/about.module.css";
import Image from "next/image";
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <>
      <div className={styles.main}>
        <h2>Off the beaten path: Explore North & Middle Caicos</h2>
        <div className={styles.imageRow}>
          <Image src='/assets/about1.jpg' width='350' height='233' priority alt='image' />
          <Image src='/assets/about2.jpg' width='350' height='233' priority alt='image' />
          <Image src='/assets/about3.jpg' width='350' height='233' priority alt='image' />
        </div>
        <p>
          If you’re searching for someplace remote, quiet, untouched and chockfull of adventure — stop what you’re
          doing and get to the twin islands of North Caicos and Middle Caicos.
        </p>
        <p>
          Connected by a scenic causeway, North and Middle Caicos are two of about 40 islands and cays that make up
          the Turks & Caicos. The island of North Caicos is home to fewer than 1,500 people, and the Middle Caicos
          population? Barely 300. Yet, the twin islands constitute the two largest islands in the Turks & Caicos
          (Middle Caicos is first, followed closely by North).
        </p>
        <p>
          North Caicos is comprised of four main settlements: Sandy Point (the arrival and departure point for the ferry),
          Kew, Whitby and Bottle Creek. On Middle Caicos, there are the villages of Conch Bar, Bambarra and Lorimers —
          each with its own unique charm.
        </p>
        <p>
          But what makes these islands so special? We’ll be honest — they’re not for everyone. If it’s a perfectly plush
          vacation you’re seeking, the kind where butlers wait on you hand and foot and every material thing you could
          ever want is at your fingertips — maybe North and Middle Caicos aren’t for you.
        </p>
        <p>
          But if you’re looking for a soul-fulfilling experience that gets you closer to nature, you’ve come to the
          right place. If the idea of exploring historical ruins, ancient caves, secret beaches and jaw-dropping seaside
          cliffs gets you excited — North and Middle Caicos are the islands for you.
        </p>
        <h2>Day Trips vs. Long Stays</h2>
        <p>
          With the ferry service operating up to five times a day Monday to Saturday (four in the slower season of
          September and October, and three on Sundays and holidays), it’s possible to visit North and Middle Caicos
          for the day and return that evening. Whether you plan a day trip or a longer stay on the islands depends
          entirely on what kind of experience you’re looking for.
        </p>
        <p>
          Bear in mind, there’s a lot of ground to cover from North Caicos to Middle Caicos — so if you visit for the
          day, you’ll have to limit your stops in order to make it back to the dock for the last ferry of the day
          (always double-check the Caribbean Cruisin ferry schedule to confirm departure times).
        </p>
        <p>
          If you visit for the day and want to take your time exploring, consider going only so far as Mudjin Harbor.
          Wild Cow Run, the last stop on Middle Caicos on the eastern side of the island, is an hour away from Sandy
          Point without stops. While you could spend the day there, you simply need to limit your stops along the way
          and give yourself ample time to drive back to the ferry.
        </p>
        <p>
          <b>Our tip for day trippers:</b> Pick a final destination for the day, and plan your stops accordingly.
          There is so much to see along your drive from North Caicos to Middle Caicos, the day can easily fly by. Just pay attention to the time.
        </p>
        <p>
          If you’re planning a longer stay on North Caicos or Middle Caicos, you have a variety of accommodations to
          choose from. You’ll also have ample more time to explore all the islands have to offer. You could easily
          spend an entire day beach hopping on North Caicos. Same goes for Mudjin Harbor, Bambarra Beach and Wild Cow
          Run. The more time you have on the islands, the more hidden gems you’re likely to discover.
        </p>
      </div>
      <Image
        src='/assets/about-footer.jpg'
        layout='responsive'
        style={{ maxHeight: '520px', maxWidth: '100vw', objectFit: 'cover' }}
        width='2500'
        height='1667'
        alt='footer'
      />
    </>
  )
}

export default About;