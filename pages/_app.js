import '../styles/globals.css';
// import '../styles/ScrollingCardUI.css';
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        {/* Google tag (gtag.js) - Added to all pages via _app.js */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17273163672"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17273163672');
          `
        }}></script>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
