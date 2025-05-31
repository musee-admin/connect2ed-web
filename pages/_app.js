import Head from "next/head";
import "../global/styles.css";
import { ParticlesProvider } from "../providers/ParticlesProvider";
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps, params }) {
  return (
    <div>
      <Head>
        <title>connec2ed.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex,follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Gantari:ital,wght@0,100..900;1,100..900&family=The+Girl+Next+Door&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ParticlesProvider>
        <Layout>
          <Component {...pageProps} params={params} />
        </Layout>
      </ParticlesProvider>
    </div>
  );
}
