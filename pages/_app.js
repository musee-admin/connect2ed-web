import Head from "next/head"
import '../global/styles.css';

export default function App({ Component, pageProps, params }) {
  return (
    <div>
      <Head>
        <title>connec2ed.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Component {...pageProps} params={params} />
    </div>
  )
}
