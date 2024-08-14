import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

interface JokeCardProps {
  setup: string;
  punchline: string;
  type: string;
  author: string;
  isLoading?: boolean;
}

const JokeCard: React.FC<JokeCardProps> = ({
  setup,
  punchline,
  type,
  author,
  isLoading = false,
}) => {
  return (
    <Card
      sx={{
        minWidth: 450,
        maxWidth: 600,
        mt: 4,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CardHeader
        title={isLoading ? <CircularProgress size={24} /> : setup}
        titleTypographyProps={{
          variant: "h6",
          fontWeight: "bold",
          color: "white",
        }}
        sx={{
          backgroundColor: "#4C02F1",
          color: "white",
          padding: 2,
        }}
      />
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            fontStyle: "italic",
            color: "#555",
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : punchline}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <Typography
          variant="caption"
          sx={{ color: "#777", fontWeight: "bold" }}
        >
          {isLoading ? <CircularProgress size={16} /> : type}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#777", fontStyle: "italic" }}
        >
          {isLoading ? <CircularProgress size={16} /> : `by ${author}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default JokeCard;
