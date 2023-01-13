import type { NextPage } from 'next';
import Image from 'next/image';
import styles from 'src/styles/attractions.module.css';
import Attraction from '../../components/attraction';

const Index: NextPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <Image
          src='/assets/attractions/attractions-header.jpg'
          width='1024'
          height='768'
          alt='header'
          style={{ maxHeight: '520px', width: '100vw', objectFit: 'cover', zIndex: '-1', filter: 'brightness(50%)' }}
        />
        <div className={styles.textOverPic}>
          <h2>
            Explore 100 square miles of tropical terrain on North & Middle Caicos. From Sandy Point to Wild Cow Run,
            there’s much to discover.
          </h2>
        </div>
      </div>
      <div className={styles.main}>
        <Attraction
          imageSrc='/assets/attractions/cottage.jpg'
          title='Cottage Pond'
          text='Hidden among a thicket of trees and encircled with ferns on North Caicos,
          this blue hole (a natural marine sinkhole) has an impressive depth of 250 feet and is home to a variety of waterbirds.'
        />
        <Attraction
          imageSrc='/assets/attractions/marycay.jpg'
          title='Three Mary Cays'
          text='Peaceful and picturesque, Three Mary Cays are named for three rock formations off the coast of North
          Caicos. This well-hidden spot makes for perfect picnic views and snorkeling adventures.'
        />
        <Attraction
          imageSrc='/assets/attractions/wades.jpg'
          title='Wades Green Plantation'
          text='Dating back to the 18th century, the ruins of this well-preserved cotton plantation offer visitors a
          walk through Turks & Caicos history. Tours must be arranged ahead of time with the TC National Trust.'
        />
        <Attraction
          imageSrc='/assets/attractions/horsestable.jpg'
          title='Horsestable Beach'
          text='Known for its welcoming rainbow-hued gazebos, stop here for a walk around the shady Casuarina gardens.
          On the beach, you’ll find a dock that offers stunning views of the open ocean beyond.'
        />
        <Attraction
          imageSrc='/assets/attractions/mudjin.jpg'
          title='Mudjin Harbor'
          text='The dramatic views of Mudjin Harbor make this spot a favorite among locals and visitors alike. Explore
          beaches, caves and rugged cliff sides, and take in the view while you have lunch at Mudjin Bar & Grill.'
        />
        <Attraction
          imageSrc='/assets/attractions/bambarra.jpg'
          title='Bambarra Beach'
          text='Look for the colorful beach huts that dot the shore — that’s how you’ll know you’ve arrived at Bambarra
          Beach. With its shallow electric blue waters and plenty of shade, this is the ideal beach for families.'
        />
        <Attraction
          imageSrc='/assets/attractions/indian.jpg'
          title='Indian Cave'
          text='Sunlight filters into this spacious cave through its numerous skylights, creating a dreamlike scene.
          The roots of tall ficus trees emerge from the openings, adding to the magic of this natural wonder.'
        />
        <Attraction
          imageSrc='/assets/attractions/conch.jpg'
          title='Conch Bar Caves'
          text='The largest above-ground cave in the Bahama archipelago, this vast cave system was formed over millions
          of years. Look for rock carvings dating back to the 1880s. All visitors must have a tour guide.'
        />
        <Attraction
          imageSrc='/assets/attractions/wildcow.jpg'
          title='Wild Cow Run'
          text='An hour’s drive from Sandy Point, Wild Cow Run is the last stop on Middle Caicos. A trek to this remote
          beach requires a vehicle with four-wheel drive — but once you arrive, you’ll see why its worth the trip.'
        />
      </div>
    </div>
  )
}

export default Index;