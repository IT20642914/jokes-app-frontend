"use client";

import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface CustomButtonProps {
  text: string;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  color?: string;
  height?: string;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  variant?: "text" | "outlined" | "contained";
  onClick: () => void;
  isLoading?: boolean;
  fullWidth?: boolean; // New prop to indicate loading state
  hoverBackGroundColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  variant,
  size = "medium",
  fullWidth = true,
  backgroundColor,
  color = "white",
  height = "2.125rem",
  textTransform = "capitalize",
  onClick,
  hoverBackGroundColor = "#437EF7",
  isLoading = false, // Default to false if not provided
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        margin: "0.5rem",
        background: backgroundColor,
        color: color,
        width: fullWidth ? "100%" : "auto",
        minWidth:
          size === "small" ? "5rem" : size === "large" ? "10rem" : "7rem",
        height: height,
        textTransform: textTransform,
        borderRadius: "5px",
        border: variant === "outlined" ? "1px solid #437EF7" : "none",
        position: "relative", // To position the loader correctly
        "&:hover": {
          backgroundColor: hoverBackGroundColor,
        },
      }}
      onClick={onClick}
      disabled={isLoading} // Disable button if loading
    >
      {isLoading ? (
        <>
          <CircularProgress
            size={24}
            sx={{
              color: variant === "outlined" ? "#437EF7" : color,
              marginRight: "8px",
            }}
          />
          Loading...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default CustomButton;
