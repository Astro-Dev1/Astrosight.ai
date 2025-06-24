import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet"/>

        {/* Meta tags, fonts, etc. */}
      </Head>
      <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1398367034680721&ev=PageView&noscript=1"
          />
        </noscript>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
