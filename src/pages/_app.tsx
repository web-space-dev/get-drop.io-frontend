import theme from "@/config/theme";
import { UserProvider } from "@/context/UserContext";
import UnauthenticatedGuard from "@/guards/UnauthenticatedGuard";
import { type EmotionCache } from "@emotion/react";
import {
  AppCacheProvider,
  createEmotionCache,
} from "@mui/material-nextjs/v16-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache({ key: "css" });

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserProvider>
          <UnauthenticatedGuard>
            <Component {...pageProps} />
          </UnauthenticatedGuard>
        </UserProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
