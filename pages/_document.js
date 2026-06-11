import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="color-scheme" content="only light" />
        <meta name="theme-color" content="#0b2239" />
        {/* Gates reveal-on-scroll styles so content stays visible without JS */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js");` }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
