import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import ReactQueryProvider from "../../ReactQueryProvider/";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <ReactQueryProvider>
          <Component {...pageProps} />
        </ReactQueryProvider>
      </SessionProvider>
    </Layout>
  );
}
