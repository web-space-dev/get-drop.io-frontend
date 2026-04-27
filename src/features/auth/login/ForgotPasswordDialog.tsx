import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormErrorText from "../components/FormErrorText";

type ForgotPasswordDialogProps = {
  open: boolean;
  email: string;
  error: string | null;
  successMessage: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onEmailChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: () => void;
};

export default function ForgotPasswordDialog({
  open,
  email,
  error,
  successMessage,
  isSubmitting,
  onClose,
  onEmailChange,
  onSubmit,
}: ForgotPasswordDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={onEmailChange}
          disabled={isSubmitting}
        />
        {error ? <FormErrorText>{error}</FormErrorText> : null}
        {successMessage ? (
          <FormErrorText>{successMessage}</FormErrorText>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
