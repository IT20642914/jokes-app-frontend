import moment from "moment";

export const validateFormData = async (data: {
  [key: string]: any;
}): Promise<[any, boolean]> => {
  let isValid = true;
  let validatedData = data;

  return new Promise((resolve) => {
    for (const [field, fieldData] of Object.entries(data)) {
      let error = null;

      if (fieldData.validator === "text") {
        if (fieldData.isRequired && !fieldData.value) {
          error = "This field is required.";
          isValid = false;
        } else if (fieldData.value) {
          if (fieldData.charLength !== undefined) {
            if (!fieldData.charLength.includes(fieldData.value.length)) {
              error = `Character length should be one of: ${fieldData.charLength.join(", ")}.`;
              if (fieldData.charLength.length === 1) {
                error = `Character length should be ${fieldData.charLength.join(", ")}.`;
              }
              isValid = false;
            }
          }
          if (
            fieldData.max !== undefined &&
            fieldData.value.length > fieldData.max
          ) {
            error = `Character length should be less than ${fieldData.max}.`;
            isValid = false;
          }
        }
      } else if (fieldData.validator === "number") {
        if (fieldData.isRequired && !fieldData.value) {
          error = "This field is required.";
          isValid = false;
        } else if (fieldData.value) {
          if (isNaN(fieldData.value)) {
            error = "Invalid Input.";
            isValid = false;
          }
          if (fieldData.min !== undefined && fieldData.value < fieldData.min) {
            error = `Value should be greater than or equal to ${fieldData.min}.`;
            isValid = false;
          }
          if (fieldData.max !== undefined && fieldData.value > fieldData.max) {
            error = `Value should be less than or equal to ${fieldData.max}.`;
            isValid = false;
          }
        }
      } else if (fieldData.validator === "date") {
        if (
          fieldData.isRequired &&
          (!fieldData.value || !moment(fieldData.value).isValid())
        ) {
          error = "This valid date is required.";
          isValid = false;
        }
      } else if (fieldData.validator === "email") {
        if (fieldData.isRequired && !fieldData.value) {
          error = "This field is required.";
          isValid = false;
        } else if (fieldData.value) {
          const lastAtPos = fieldData.value.lastIndexOf("@");
          const lastDotPos = fieldData.value.lastIndexOf(".");
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              fieldData.value.indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              fieldData.value.length - lastDotPos > 2
            )
          ) {
            error = "Invalid email ID.";
            isValid = false;
          }
        }
      } else if (fieldData.validator === "mobile") {
        const mobilePattern = /^[0-9]{9,15}$/;
        if (fieldData.isRequired && !fieldData.value) {
          error = "This field is required.";
          isValid = false;
        } else if (fieldData.value && !mobilePattern.test(fieldData.value)) {
          error = "Invalid mobile number.";
          isValid = false;
        }
      }

      validatedData = {
        ...validatedData,
        [field]: {
          ...fieldData,
          error: error,
        },
      };
    }

    resolve([validatedData, isValid]);
  });
};
