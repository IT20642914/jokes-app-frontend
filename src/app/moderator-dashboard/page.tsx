"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useRequireAuth from "@/hooks/useRequireAuth";
import styles from "./moderatorDashboard.module.scss";
import {
  JokeFormDto,
  JokeSubmitFormDto,
  JokeTypeDto,
} from "@/utilities/models/joke.model";
import { jokeService } from "@/services/joke.service";
import JokeForm from "@/components/JokeForm/JokeForm";
import { Grid } from "@mui/material";
import CustomButton from "@/components/shared/CustomButton";
import { validateFormData } from "@/utilities/helpers";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal"; // Import the Confirmation Modal component
import { SCREEN_MODES } from "@/utilities/constants/app.constants";

const ModeratorDashboard = () => {
  // Hooks must be at the top level
  const INITIAL_JOKE_FORM_DATA: JokeSubmitFormDto = {
    status: {
      value: "",
      isRequired: true,
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
      disable: true,
      readonly: true,
      validator: "text",
      error: null,
    },
    _id: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "text",
      error: null,
    },
  };
  const isAuthenticated = useRequireAuth();
  const [jokeFormData, setJokeFormData] = useState<JokeSubmitFormDto>(
    INITIAL_JOKE_FORM_DATA,
  );
  const [jockTypes, setJockTypes] = useState<JokeTypeDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [helperText, setHelperText] = useState(true);
  const [mode, setMode] = useState(SCREEN_MODES.EDIT);
  const [isHavePendingJoke, setIsHavePendingJoke] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<
    "approve" | "reject"
  >();

  useEffect(() => {
    getJockTypes();
    getPendingJoke();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const getJockTypes = () => {
    jokeService.getJokeTypes().then((response) => {
      setJockTypes(response.data.data);
    });
  };

  const getPendingJoke = () => {
    jokeService.getPendingJoke().then((response) => {
      console.log("response", response.data.data);
      if (response.data.data === null) {
        setIsHavePendingJoke(false);
        setJokeFormData(INITIAL_JOKE_FORM_DATA);
      } else {
        setIsHavePendingJoke(true);
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
          _id: {
            ...jokeFormData._id,
            value: response.data.data._id,
          },
          status: {
            ...jokeFormData.status,
            value: response.data.data.status,
          },
        });
      }
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
          value: {
            _id: selectedType?._id,
            name: selectedType?.name,
          } as JokeTypeDto,
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
    if (isValid) {
      setIsLoading(true);
      const jokeData = {
        _id: jokeFormData._id.value,
        setup: jokeFormData.setup.value,
        punchline: jokeFormData.punchline.value,
        type: {
          _id: jokeFormData.type.value._id,
          name: jokeFormData.type.value.name,
        },
        status: jokeFormData.status.value,
      };
      jokeService
        .updateJoke(jokeData)
        .then((response) => {
          console.log("response", response.data.data);
          toast.success("Joke updated successfully");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("Joke update failed");
          setIsLoading(false);
        });
    }
  };

  const onApprove = (value: boolean) => {
    if (value) {
      setIsLoading(true);
      jokeService
        .approveJoke(jokeFormData._id.value)
        .then((response) => {
          console.log("response", response.data.data);
          toast.success("Joke approved successfully");
          getPendingJoke();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
          toast.error("Joke approval failed");
        });
    } else {
      setIsLoading(true);
      jokeService
        .rejectJoke(jokeFormData._id.value)
        .then((response) => {
          console.log("response", response.data.data);
          toast.success("Joke rejected successfully");
          getPendingJoke();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
          toast.error("Joke rejection failed");
        });
    }
  };

  const handleConfirmAction = (confirm: boolean) => {
    setIsConfirmationModalOpen(false);
    if (confirm) {
      if (actionToConfirm === "approve") {
        onApprove(true);
      } else if (actionToConfirm === "reject") {
        onApprove(false);
      }
    }
  };

  const openConfirmationModal = (action: "approve" | "reject") => {
    setActionToConfirm(action);
    setIsConfirmationModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Moderator Dashboard</h1>
      </div>
      <div className={styles.formContainer}>
        {isHavePendingJoke ? (
          <div className={styles.formContainerbox}>
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  onClick={() => openConfirmationModal("approve")}
                  backgroundColor="#4C02F1"
                  hoverBackGroundColor="#007025"
                  isLoading={isLoading}
                  text={"APPROVE"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  onClick={() => openConfirmationModal("reject")}
                  backgroundColor="#F14C02"
                  hoverBackGroundColor="#F14C02"
                  isLoading={isLoading}
                  text={"Reject And Delete"}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className={styles.noPendingJokesMessage}>
            <h2>No pending jokes available for moderation.</h2>
          </div>
        )}
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title={actionToConfirm === "approve" ? "Approve Joke" : "Reject Joke"}
        description={
          actionToConfirm === "approve"
            ? "Are you sure you want to approve this joke?"
            : "Are you sure you want to reject and delete this joke?"
        }
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ModeratorDashboard), {
  ssr: false,
});
