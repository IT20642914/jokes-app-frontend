"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import JokeCard from "@/components/shared/JokeCard";
import { JokeFormDto, JokeTypeDto } from "@/utilities/models/joke.model";
import { jokeService } from "@/services/joke.service";
import CustomButton from "@/components/shared/CustomButton";

const INITIAL_JOKE_FORM_DATA: JokeFormDto = {
  setup: {
    value: "",
    isRequired: true,
    disable: false,
    readonly: false,
    validator: "text",
    error: null,
  },
  punchline: {
    value: "",
    isRequired: true,
    disable: false,
    readonly: false,
    validator: "text",
    error: null,
  },
  type: {
    value: "",
    isRequired: true,
    disable: false,
    readonly: false,
    validator: "text",
    error: null,
  },
  author: {
    value: "",
    isRequired: true,
    disable: false,
    readonly: false,
    validator: "text",
    error: null,
  },
};

export default function Home() {
  const [jokeFormData, setJokeFormData] = useState<JokeFormDto>(
    INITIAL_JOKE_FORM_DATA,
  );
  const [jockTypes, setJockTypes] = useState<JokeTypeDto[]>([]);
  const [selectedJokeType, setSelectedJokeType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getJockTypes();
  }, []);

  const getJockTypes = () => {
    jokeService.getJokeTypes().then((response) => {
      setJockTypes(response.data.data);
    });
  };

  const handleInputChange = (field: keyof JokeFormDto, value: string) => {
    setJokeFormData({
      ...jokeFormData,
      [field]: {
        ...jokeFormData[field],
        value,
        error: null,
      },
    });
  };

  const handleJokeTypeChange = (event: SelectChangeEvent) => {
    setSelectedJokeType(event.target.value);
  };

  const handleGetNewJock = () => {
    setIsLoading(true);
    jokeService.getRandomJoke(selectedJokeType).then((response) => {
      console.log(response.data.data);
      setIsLoading(false);
      setJokeFormData({
        ...jokeFormData,
        setup: {
          ...jokeFormData.setup,
          value: response.data.data.setup,
        },
        punchline: {
          ...jokeFormData.punchline,
          value: response.data.data.punchline,
        },
        type: {
          ...jokeFormData.type,
          value: response.data.data.type,
        },
        author: {
          ...jokeFormData.author,
          value: response.data.data.author,
        },
      });
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 5,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(90deg, #130468, #29039E, #4C02F1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
        }}
      >
        Welcome to Joke App!
      </Typography>

      <JokeCard
        setup={jokeFormData.setup.value || "Select a joke type "}
        punchline={
          jokeFormData.punchline.value ||
          `click "Get a New Joke" button to see a joke here.`
        }
        type={String(jokeFormData.type.value)}
        author={jokeFormData.author.value}
        isLoading={isLoading}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Select
                fullWidth={true}
                value={selectedJokeType}
                onChange={handleJokeTypeChange}
                displayEmpty={true}
                sx={{ minWidth: 200 }}
                disabled={isLoading}
              >
                {jockTypes.map((jockType) => (
                  <MenuItem key={jockType._id} value={jockType.name}>
                    {jockType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomButton
              variant="contained"
              size="large"
              backgroundColor="#4C02F1"
              onClick={handleGetNewJock}
              isLoading={isLoading}
              height="2.5rem"
              text={"Get a New Joke"}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
