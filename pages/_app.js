import Head from "next/head";
import "../global/styles.css";
import { ParticlesProvider } from "../providers/ParticlesProvider";
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps, params }) {
  return (
    <div>
      <Head>
        <title>Link2Ed</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="index,follow" />
        <meta name="description" content="Link2Ed is a purpose-built platform for school psychology and special education teams — bringing collaboration, progress tracking, standardised workflows, and secure data management into one place." />
        <meta property="og:title" content="Link2Ed" />
        <meta property="og:description" content="A platform built so the right support reaches every child, faster. Less paperwork. More impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://link2ed.in" />
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
