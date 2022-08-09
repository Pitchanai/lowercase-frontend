import Head from "next/head";
import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
// import nextPackage from "next/package.json";

// import TextField from "@mui/joy/TextField";

export default function Home({}) {
  const textRef = useRef(null);
  const [textValue, setTextValue] = useState("");
  const [notiText, setNotiText] = useState("");

  const inputHandle = (val: React.ChangeEvent<HTMLInputElement>) => {
    const text = val.target.value;
    const lowercaseText = text?.toLowerCase();
    setTextValue(lowercaseText);

    if (!lowercaseText) return;

    navigator?.clipboard.writeText(text);
    setNotiText(lowercaseText);
  };

  const inputFocusHandle = () => {
    textRef.current.select();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>lowercase</title>
        <meta name="description" content="lowercase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {notiText ? <div className={styles.noti}>"{notiText}" copied!</div> : null}
        <input
          ref={textRef}
          className={styles.bigInput}
          value={textValue}
          onChange={inputHandle}
          onFocus={inputFocusHandle}
          placeholder="paste here..."
        />
      </main>
    </div>
  );
}
