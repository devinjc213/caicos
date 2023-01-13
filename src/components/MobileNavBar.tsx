import { MobileMenuDropdown } from './MobileMenuDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import Socials from '../components/Socials';

const blackText: string[] = ['/about', '/car-rentals', '/contact'];

const MobileNavBar = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [strokeBlack, setStrokeBlack] = useState<boolean>(show || blackText.includes(router.pathname));

  const scrollFunction = () => {
    const doc = document.getElementById('mobileContainer');
    const svg = document.querySelectorAll('svg > path');

    console.log(svg);
    if (!doc || !svg) return

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
      svg.forEach(path => path.setAttribute('stroke', 'white'));
    }

    if (window.scrollY === 0) {
      doc.style.top = '0';
      doc.style.backgroundColor = 'transparent';
      if (blackText.includes(router.pathname)) {
        doc.style.color = 'black';
        svg.forEach(path => path.setAttribute('stroke', 'black'));
      }
    }

    setScrollPosition(window.scrollY);
    setStrokeBlack(show || blackText.includes(router.pathname));
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => window.removeEventListener("scroll", scrollFunction);
  })

  const Hamburger = (
    <svg id='svg' width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 10.7857H14' stroke={(show || blackText.includes(router.pathname)) ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
      <path d='M1 5.89285H14' stroke={(show || blackText.includes(router.pathname)) ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
      <path d='M1 1H14' stroke={(show || blackText.includes(router.pathname)) ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
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
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Link href='/' legacyBehavior>
              <a className={router.pathname === '/' ? styles.mobileLinkActive : styles.mobileLink}>Home</a>
            </Link>
            <Link href='/about' legacyBehavior>
              <a className={router.pathname === '/about' ? styles.mobileLinkActive : styles.mobileLink}>About</a>
            </Link>
            <Link href='/getting-here' legacyBehavior>
              <a className={router.pathname === '/getting-here' ? styles.mobileLinkActive : styles.mobileLink}>Getting Here</a>
            </Link>
            <Link href='/attractions' legacyBehavior>
              <a className={router.pathname === '/attractions' ? styles.mobileLinkActive : styles.mobileLink}>Attractions</a>
            </Link>
            <Link href='/accommodations' legacyBehavior>
              <a className={router.pathname === '/accommodations' ? styles.mobileLinkActive : styles.mobileLink}>Accommodations</a>
            </Link>
            <Link href='/car-rentals' legacyBehavior>
              <a className={router.pathname === '/car-rentals' ? styles.mobileLinkActive : styles.mobileLink}>Car Rentals</a>
            </Link>
            <Link href='/contact' legacyBehavior>
              <a className={router.pathname === '/contact' ? styles.mobileLinkActive : styles.mobileLink}>Contact</a>
            </Link>
          </div>
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
            <Socials />
          </div>
        </div>
      </MobileMenuDropdown>
    </div>
  );
}

export default MobileNavBar;