import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import SessionAuth from "../shared/SessionAuth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Dashboard - Central</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <SessionProvider session={pageProps.session}>
          <SessionAuth>
            <Component {...pageProps} />
          </SessionAuth>
        </SessionProvider>
      </MantineProvider>
    </>
  );
};

export default MyApp;
