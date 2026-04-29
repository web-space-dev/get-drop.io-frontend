import theme from "@/config/theme";
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  createEmotionCache,
  documentGetInitialProps,
} from "@mui/material-nextjs/v16-pagesRouter";
import {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps,
) {
  return (
    <Html lang="en">
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@400;600;700&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  try {
    const finalProps = await documentGetInitialProps(ctx, {
      emotionCache: createEmotionCache({ key: "css" }),
    });
    return finalProps;
  } catch (error) {
    console.error("Error creating Emotion cache:", error);
  }
};
