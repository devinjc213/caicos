import styles from "src/components/Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export const blackText: string[] = ['/about', '/car-rentals', '/contact', '/bookings'];

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  const [scrollClasses, setScrollClasses] = useState<string>(`${styles.container!}`)

  useEffect(() => {
    setScrollClasses((blackText.includes(router.pathname))
      ? `${styles.container!} ${styles.blackText!}`
      : `${styles.container!} ${styles.whiteText!}`);
  }, [router.pathname]);

  const scrollFunction = () => {
    if (window.scrollY > 20) setScrollClasses(`${styles.container!} ${styles.scrolledNav!}`);
    else setScrollClasses(`${styles.mobileContainer!}`);

    if (window.scrollY < scrollPosition) setScrollClasses(`${styles.container!} ${styles.scrolledShowNav!}`);

    if (window.scrollY === 0) {
      if (blackText.includes(router.pathname)) setScrollClasses(`${styles.container!} ${styles.blackText!}`);
      else setScrollClasses(`${styles.container!} ${styles.whiteText!}`);
    }

    setScrollPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => window.removeEventListener("scroll", scrollFunction);
  })

  return (
    <div className={scrollClasses}>
      <h2><Link href='/' style={{ textDecoration: "none" }}>North & Middle Caicos</Link></h2>
      <div>
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
    </div>
  );
}

export default Navbar;