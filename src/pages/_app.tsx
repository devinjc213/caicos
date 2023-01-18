import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { Josefin_Sans } from '@next/font/google';
import MobileNavBar from '../components/MobileNavBar';
import styles from '../styles/_app.module.css';

const JosefineSans = Josefin_Sans({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={JosefineSans.className}>
        <div className={styles.nav}>
          <Navbar />
        </div>
        <div className={styles.mobileNav}>
          <MobileNavBar />
        </div>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
