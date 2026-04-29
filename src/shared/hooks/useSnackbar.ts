import { type SnackbarSeverity, type SnackbarState } from "@/types/ui";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createElement, useCallback, useState } from "react";

export const SNACKBAR_AUTO_HIDE_DURATION_MS = 3000;

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarSeverity = "info") => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    },
    [],
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const SnackbarComponent = useCallback(
    () =>
      createElement(
        Snackbar,
        {
          open: snackbar.open,
          autoHideDuration: SNACKBAR_AUTO_HIDE_DURATION_MS,
          onClose: hideSnackbar,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        },
        createElement(
          Alert,
          {
            onClose: hideSnackbar,
            severity: snackbar.severity,
            variant: "filled",
            sx: { width: "100%" },
          },
          snackbar.message,
        ),
      ),
    [hideSnackbar, snackbar.message, snackbar.open, snackbar.severity],
  );

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    SnackbarComponent,
  };
};
