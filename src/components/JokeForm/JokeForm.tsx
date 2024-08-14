import React from "react";
import {
  Grid,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import CustomButton from "@/components/shared/CustomButton";
import {
  JokeFormDto,
  JokeSubmitFormDto,
  JokeTypeDto,
} from "@/utilities/models/joke.model";

interface JokeFormProps {
  jokeForm: JokeSubmitFormDto;
  jokeTypes: JokeTypeDto[]; // List of available joke types
  helperText?: boolean;
  handleInputFocus: (property: keyof JokeFormDto) => void;
  onInputHandleChange: (property: keyof JokeFormDto, value: any) => void;
  onSave: () => void;
  mode: string;
  isLoading: boolean;
}

const JokeForm: React.FC<JokeFormProps> = ({
  jokeForm,
  jokeTypes,
  helperText,
  handleInputFocus,
  onInputHandleChange,
  onSave,
  mode,
  isLoading,
}) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Setup"
            value={jokeForm.setup.value}
            onFocus={() => handleInputFocus("setup")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onInputHandleChange("setup", event.target.value)
            }
            error={!!jokeForm.setup.error}
            helperText={helperText && jokeForm.setup.error}
            required={jokeForm.setup.isRequired}
            disabled={jokeForm.setup.disable}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Punchline"
            value={jokeForm.punchline.value}
            onFocus={() => handleInputFocus("punchline")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onInputHandleChange("punchline", event.target.value)
            }
            error={!!jokeForm.punchline.error}
            helperText={helperText && jokeForm.punchline.error}
            required={jokeForm.punchline.isRequired}
            disabled={jokeForm.punchline.disable}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="joke-type-label">Joke Type</InputLabel>
            <Select
              labelId="joke-type-label"
              id="joke-type-select"
              value={jokeForm.type.value._id || ""}
              label="Joke Type"
              onFocus={() => handleInputFocus("type")}
              onChange={(event) =>
                onInputHandleChange("type", event.target.value)
              }
              error={!!jokeForm.type.error}
              disabled={jokeForm.type.disable}
            >
              {jokeTypes.map((jokeType) => (
                <MenuItem key={jokeType._id} value={jokeType._id}>
                  {jokeType.name}
                </MenuItem>
              ))}
            </Select>
            {helperText && jokeForm.type.error && (
              <FormHelperText sx={{ color: "#FF0001" }}>
                {jokeForm.type.error}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Author"
            value={jokeForm.author.value}
            onFocus={() => handleInputFocus("author")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onInputHandleChange("author", event.target.value)
            }
            error={!!jokeForm.author.error}
            helperText={helperText && jokeForm.author.error}
            required={jokeForm.author.isRequired}
            disabled={jokeForm.author.disable}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <CustomButton
          onClick={onSave}
          backgroundColor="#4C02F1"
          isLoading={isLoading}
          text={mode === "CREATE" ? "Save" : "Update"}
        />
      </Box>
    </div>
  );
};

export default JokeForm;
