"use client";

import {
  alpha,
  Autocomplete,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Select,
  styled,
  Button,
  Switch,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
  LinearProgress,
  linearProgressClasses,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const colors = {
  primary: "#437EF7", // Primary color
  secondary: "#ffffff", // Secondary color
  textPrimary: "#000000", // Primary text color
  textSecondary: "#495057", // Secondary text color
  borderColor: "#e0e0e0", // Border color
  hoverColor: "#F5F5F5", // Hover background color
};

export const CustomVisibilityIcon = styled(Visibility)({
  color: "#437EF7",
});

export const CustomVisibilityOffIcon = styled(VisibilityOff)({
  color: "#437EF7",
});
export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    backgroundColor: colors.secondary,
    color: colors.textPrimary,
    borderColor: colors.borderColor,
  },
  "& .MuiInputLabel-root": {
    color: colors.textPrimary,
    pointerEvents: "none",
  },
  "& .MuiInputLabel-root.Mui-required::after": {
    color: colors.primary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.primary,
    opacity: 1,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.borderColor,
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: colors.primary,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.primary,
      borderWidth: "2px",
    },
    "& input::placeholder": {
      color: colors.textPrimary,
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: colors.textPrimary,
    "&:focus": {
      color: colors.primary,
    },
    "&.Mui-focused": {
      color: colors.primary,
    },
  },
  "& .MuiSvgIcon-root": {
    color: colors.primary,
    "&:focus": {
      color: colors.primary,
    },
    "&.Mui-focused": {
      color: colors.primary,
    },
  },
  "& .MuiInputAdornment-root": {
    "& .MuiSvgIcon-root": {
      color: colors.textPrimary,
    },
    "&.Mui-focused .MuiSvgIcon-root": {
      color: colors.primary,
    },
  },
  "&.Mui-disabled .MuiOutlinedInput-root": {
    borderColor: colors.borderColor,
  },
}));

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "width",
})(({ theme, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    backgroundColor: colors.secondary,
    color: colors.textPrimary,
    padding: "10px",
    fontWeight: 500,
    width: width || "auto",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "10px",
    fontWeight: 600,
    color: colors.textSecondary,
    backgroundColor: colors.secondary,
    width: width || "auto",
  },
  "&:last-child": {
    position: "sticky",
    right: 0,
    zIndex: 10,
  },
}));

export const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiInputBase-root": {
    color: colors.textPrimary,
    backgroundColor: colors.secondary,
    "&:hover": {
      backgroundColor: colors.secondary,
    },
    "&.Mui-focused": {
      backgroundColor: colors.secondary,
    },
  },
  "& .MuiInputLabel-root": {
    color: colors.textPrimary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.textPrimary,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.borderColor,
    },
    "&:hover fieldset": {
      borderColor: colors.primary,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.primary,
    },
    "& input::placeholder": {
      color: colors.textPrimary,
    },
  },
  "& .MuiAutocomplete-paper": {
    backgroundColor: colors.secondary,
  },
  "& .MuiAutocomplete-popper": {
    "& .MuiPopper-root": {
      backgroundColor: colors.secondary,
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: colors.textPrimary,
  },
}));
