import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseServices } from "@/utils/firebaseServer/firebaseClient";

export default function Home() {
  const [status, setStatus] = React.useState("");

  const handleTestWrite = React.useCallback(async () => {
    try {
      setStatus("Writing test document...");
      const { db } = getFirebaseServices();
      const docRef = await addDoc(collection(db, "quickTest"), {
        message: "hello world",
        createdAt: serverTimestamp(),
        source: "homepage-test-button",
      });

      setStatus(`Write complete. Document ID: ${docRef.id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown write error";
      setStatus(`Write failed: ${errorMessage}`);
    }
  }, []);

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
      <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <Button variant="contained" onClick={handleTestWrite}>
          Write Hello World Test Doc
        </Button>
        {status ? <Typography>{status}</Typography> : null}
      </Box>
      <Link href="/about">Go to About</Link>
    </Box>
  );
}
