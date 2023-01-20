import { MobileMenuDropdown } from './MobileMenuDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import Socials from '../components/Socials';

const blackText: string[] = ['/about', '/car-rentals', '/contact', '/bookings'];

const MobileNavBar = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollClasses, setScrollClasses] = useState<string>(`${styles.mobileContainer!}`)

  useEffect(() => {
    setScrollClasses((blackText.includes(router.pathname))
      ? `${styles.mobileContainer!} ${styles.blackText!}`
      : `${styles.mobileContainer!} ${styles.whiteText!}`);
  }, [router.pathname]);

  const scrollFunction = () => {
    if (window.scrollY > 20) setScrollClasses(`${styles.mobileContainer!} ${styles.scrolledNav!}`);
    else setScrollClasses(`${styles.mobileContainer!}`);

    if (window.scrollY < scrollPosition) setScrollClasses(`${styles.mobileContainer!} ${styles.scrolledShowNav!}`);

    if (window.scrollY === 0) {
      if (blackText.includes(router.pathname)) setScrollClasses(`${styles.mobileContainer!} ${styles.blackText!}`);
      else setScrollClasses(`${styles.mobileContainer!} ${styles.whiteText!}`);
    }

    setScrollPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => window.removeEventListener("scroll", scrollFunction);
  });

  const Hamburger = (
    <svg id='svg' width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 10.7857H14' stroke={(show || blackText.includes(router.pathname)) ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
      <path d='M1 5.89285H14' stroke={(show || blackText.includes(router.pathname)) ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
      <path d='M1 1H14' stroke={(show || blackText.includes(router.pathname)) ? 'black' : 'white'} strokeOpacity='0.5' strokeWidth='2' strokeLinecap='round' />
    </svg>
  );

  return (
    <div className={show ? `${styles.mobileContainer!} ${styles.openNav!}` : scrollClasses}>
      <h2><Link href='/' style={{ textDecoration: "none" }}>North & Middle Caicos</Link></h2>
      <MobileMenuDropdown label={Hamburger} setShowParent={setShow}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
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
          <Socials />
        </div>
      </MobileMenuDropdown>
    </div>
  );
}

export default MobileNavBar;