import * as React from "react";
import NextScript from "next/script";
import { AppProps } from "next/app";

import "../styles/globals.css";
import "nextra-theme-docs/style.css";

// https://github.com/import-js/eslint-plugin-import/issues/1868
// eslint-disable-next-line import/no-unresolved
import { Providers } from "../components/core";
import { encodeBase64 } from "../lib/encode";
import { useFathom } from "../hooks";

const themeKey = "theme";

function MyApp({ Component, pageProps }: AppProps) {
  useFathom();
  const themeScriptSrc = `!function(){try{var d=document.documentElement;var e=localStorage.getItem(${themeKey});if(e){d.setAttribute('data-theme',e.trim())}else{d.setAttribute('data-theme','light');}}catch(t){}}();`;

  // We MUST use next/script's `beforeInteractive` strategy to avoid flashing on load.
  // However, it only accepts the `src` prop, not `dangerouslySetInnerHTML` or `children`
  // But our script cannot be external because it changes at runtime based on React props
  // so we trick next/script by passing `src` as a base64 JS script
  const encodedScript = `data:text/javascript;base64,${encodeBase64(
    themeScriptSrc
  )}`;

  const getLayout =
    (Component as any).getLayout || ((page: React.ReactElement) => page);

  return (
    <>
      {/* Set theme directly or load from cookie to prevent flash */}
      <NextScript
        id="theme-script"
        src={encodedScript}
        strategy="beforeInteractive"
      />

      <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
    </>
  );
}

export default MyApp;
