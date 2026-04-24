import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 3, md: "171px" },
        pt: { xs: 8, md: "100px" },
        pb: { xs: 10, md: "120px" },
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(241,240,253,0.75) 45%, rgba(216,237,255,0.65) 100%)",
      }}
    >
      <Typography component="h1">Hello World</Typography>
      <Link href="/about">Go to About</Link>
      <Link href="/auth/register">Go to Register</Link>
    </Box>
  );
}
