import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "@/config/theme";
import { UserProvider, useUser } from "@/context/UserContext";
import UnauthenticatedGuard from "@/guards/UnauthenticatedGuard";
import AuthenticatedNavbar from "@/components/navigation/AuthenticatedNavbar";

type AppContentProps = {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
};

function AppContent({ Component, pageProps }: AppContentProps) {
  const { authUser, isLoading } = useUser();

  return (
    <>
      {!isLoading && authUser ? <AuthenticatedNavbar /> : null}
      <Component {...pageProps} />
    </>
  );
}

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <UnauthenticatedGuard>
              <AppContent Component={Component} pageProps={pageProps} />
            </UnauthenticatedGuard>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
