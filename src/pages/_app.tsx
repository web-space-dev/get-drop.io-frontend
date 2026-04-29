import * as React from "react";
import { type EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppCacheProvider,
  createEmotionCache,
} from "@mui/material-nextjs/v16-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/config/theme";
import { UserProvider } from "@/context/UserContext";
import UnauthenticatedGuard from "@/guards/UnauthenticatedGuard";

const clientSideEmotionCache = createEmotionCache({ key: "css" });

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <UnauthenticatedGuard>
              <Component {...pageProps} />
            </UnauthenticatedGuard>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
