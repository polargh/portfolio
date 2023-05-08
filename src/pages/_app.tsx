import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Polar</title>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
