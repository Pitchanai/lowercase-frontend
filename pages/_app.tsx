import "../styles/globals.css";
import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

const getLibrary = (provider, _connector) => {
  return new Web3(provider);
};

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
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component sx={{ height: "100%" }} {...pageProps} />
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
