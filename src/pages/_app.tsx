import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import Navbar from '../components/Navbar';
import { Josefin_Sans } from '@next/font/google';

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
        <Navbar />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
