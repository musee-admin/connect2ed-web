import Head from "next/head"
import '../global/styles.css';
import { ParticlesProvider } from "../providers/ParticlesProvider";
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps, params }) {
  return (
    <div>
      <Head>
        <title>connec2ed.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex,follow" />
        <link rel="stylesheet" href="https://use.typekit.net/elg1esk.css" />
      </Head>
      <ParticlesProvider>
        <Layout>
          <Component {...pageProps} params={params} />
        </Layout>
      </ParticlesProvider>
    </div>
  )
}
