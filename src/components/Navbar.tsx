import styles from "src/components/Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export const blackText: string[] = ['/about', '/car-rentals', '/contact'];

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();


  const scrollFunction = () => {
    const doc = document.getElementById('container');
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

  return (
    <div className={styles.container} style={{ color: blackText.includes(router.pathname) ? 'black' : 'white'}}>
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