import { MobileMenuDropdown } from './MobileMenuDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { blackText } from './Navbar';
import { useEffect, useState } from 'react';

const MobileNavBar = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollFunction = () => {
    const doc = document.getElementById('mobileContainer');
    if (!doc) return

    if (window.scrollY > 20) {
      doc.style.top = '-120px';
    } else {
      doc.style.top = '0';
      doc.style.backgroundColor = 'transparent';
    }

    if (window.scrollY < scrollPosition) {
      doc.style.top = '0';
      doc.style.color = 'white';
      doc.style.backgroundColor = 'black';
    }

    if (window.scrollY === 0) {
      doc.style.top = '0';
      doc.style.backgroundColor = 'transparent';
      if (blackText.includes(router.pathname)) doc.style.color = 'black';
    }

    setScrollPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => window.removeEventListener("scroll", scrollFunction);
  })

  const Hamburger = (
    <svg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 10.7857H14' stroke={show ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
      <path d='M1 5.89285H14' stroke={show ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
      <path d='M1 1H14' stroke={show ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
    </svg>
  );

  return (
    <div
      className={styles.mobileContainer}
      style={{ color: show ? 'black' : blackText.includes(router.pathname) ? 'black' : 'white', background: show ? 'white' : 'transparent' }}
      id='mobileContainer'
    >
      <h2><Link href='/' style={{ textDecoration: "none" }}>North & Middle Caicos</Link></h2>
      <MobileMenuDropdown label={Hamburger} setShowParent={setShow}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Link href='/about' legacyBehavior>
            <a className={router.pathname === '/about' ? styles.linkActive : styles.link}>About</a>
          </Link>
          <Link href='/getting-here' legacyBehavior>
            <a className={router.pathname === '/getting-here' ? styles.linkActive : styles.link}>Getting Here</a>
          </Link>
          <Link href='/attractions' legacyBehavior>
            <a className={router.pathname === '/attractions' ? styles.linkActive : styles.link}>Attractions</a>
          </Link>
          <Link href='/accommodations' legacyBehavior>
            <a className={router.pathname === '/accommodations' ? styles.linkActive : styles.link}>Accommodations</a>
          </Link>
          <Link href='/car-rentals' legacyBehavior>
            <a className={router.pathname === '/car-rentals' ? styles.linkActive : styles.link}>Car Rentals</a>
          </Link>
          <Link href='/contact' legacyBehavior>
            <a className={router.pathname === '/contact' ? styles.linkActive : styles.link}>Contact</a>
          </Link>
        </div>
      </MobileMenuDropdown>
    </div>
  );
}

export default MobileNavBar;