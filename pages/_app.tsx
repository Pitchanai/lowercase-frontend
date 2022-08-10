import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>lowercase</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://lowercase.lol" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="lowercase" />
        <meta property="og:description" content="The most powerful lowercase tool" />
        <meta property="og:image" content="https://lowercase.lol/lowercase.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="lowercase" />
        <meta name="twitter:description" content="The most powerful lowercase tool" />
        <meta name="twitter:image" content="https://lowercase.lol/lowercase.png" />
      </Head>
      <Component sx={{ height: "100%" }} {...pageProps} />
    </>
  );
}

export default MyApp;
