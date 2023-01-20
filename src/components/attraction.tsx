import Image from 'next/image';
import styles from 'src/components/attraction.module.css';

const Attraction = ({ imageSrc, title, text }: { imageSrc: string, title: string, text: string}) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={imageSrc} alt='attraction' width='473' height='378' />
        <div className={styles.learnMore}>Learn more</div>
      </div>
      <div className={styles.text}>
        <h2>{title}</h2>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default Attraction;