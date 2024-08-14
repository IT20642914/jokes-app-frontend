"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  JokeFormDto,
  JokeSubmitFormDto,
  JokeTypeDto,
} from "@/utilities/models/joke.model";
import { jokeService } from "@/services/joke.service";
import styles from "./submit-joke.module.scss";
import JokeForm from "@/components/JokeForm/JokeForm";
import { SCREEN_MODES } from "@/utilities/constants/app.constants";
import { validateFormData } from "@/utilities/helpers";
const Page = () => {
  const INITIAL_JOKE_FORM_DATA: JokeSubmitFormDto = {
    _id: {
      value: "",
      isRequired: false,
      disable: false,
      readonly: false,
      validator: "text",
      error: null,
    },
    status: {
      value: "",
      isRequired: false,
      disable: false,
      readonly: false,
      validator: "text",
      error: null,
    },
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
      value: {} as JokeTypeDto,
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "object",
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
  const [jokeFormData, setJokeFormData] = useState<JokeSubmitFormDto>(
    INITIAL_JOKE_FORM_DATA,
  );
  const [jockTypes, setJockTypes] = useState<JokeTypeDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [helperText, setHelperText] = useState(true);
  const [mode, setMode] = useState(SCREEN_MODES.CREATE);

  useEffect(() => {
    getJockTypes();
  }, []);

  const getJockTypes = () => {
    jokeService.getJokeTypes().then((response) => {
      setJockTypes(response.data.data);
    });
  };

  const handleInputChange = (field: keyof JokeFormDto, value: string) => {
    if (field === "type") {
      const selectedType: JokeTypeDto | undefined = jockTypes.find(
        (type: JokeTypeDto) => type._id === value,
      );
      setJokeFormData({
        ...jokeFormData,
        [field]: {
          ...jokeFormData[field],
          value: selectedType || ({} as JokeTypeDto),
        },
      });
      return;
    }
    setJokeFormData({
      ...jokeFormData,
      [field]: {
        ...jokeFormData[field],
        value,
      },
    });
  };
  const handleInputFocus = (field: keyof JokeFormDto) => {
    setJokeFormData({
      ...jokeFormData,
      [field]: {
        ...jokeFormData[field],
        error: null,
      },
    });
  };
  const onSave = async () => {
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(jokeFormData);
    setJokeFormData(validateData);
    console.log("validateData", validateData);
    if (isValid) {
      setIsLoading(true);
      const jokeData = {
        setup: jokeFormData.setup.value,
        punchline: jokeFormData.punchline.value,
        type: {
          _id: jokeFormData.type.value._id,
          name: jokeFormData.type.value,
        },
        author: jokeFormData.author.value,
      };
      jokeService
        .submitJoke(jokeData)
        .then((response) => {
          toast.success("Joke submitted successfully");
          setJokeFormData(INITIAL_JOKE_FORM_DATA);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to submit joke");
          setIsLoading(false);
        });
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.title}>
        <h1>Submit a Joke</h1>
      </div>
      <div className={styles.formContainer}>
        <JokeForm
          isLoading={isLoading}
          handleInputFocus={handleInputFocus}
          helperText={helperText}
          jokeForm={jokeFormData}
          jokeTypes={jockTypes}
          mode={mode}
          onInputHandleChange={handleInputChange}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default Page;
