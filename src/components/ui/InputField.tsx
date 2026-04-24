import * as React from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputLabel-root": {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  },
  "& .MuiInputBase-root": {
    ...theme.typography.body1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.75, 1.5),
  },
  "& .MuiFormHelperText-root": {
    ...theme.typography.caption,
    marginLeft: 0,
  },
}));

export type InputFieldProps = TextFieldProps;

export default function InputField(props: InputFieldProps) {
  return <StyledTextField variant="outlined" {...props} />;
}
