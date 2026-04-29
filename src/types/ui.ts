export type SnackbarSeverity = "success" | "error" | "warning" | "info";

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
};
