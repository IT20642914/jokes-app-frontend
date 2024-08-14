import moment from "moment";

export interface FormFieldDto<T> {
  value: T;
  validator:
    | "text"
    | "number"
    | "date"
    | "object"
    | "array"
    | "dates"
    | "email"
    | "mobile"
    | null;
  isRequired: boolean;
  error: string | null;
  disable: boolean;
  readonly: boolean;
  max?: number;
  min?: number;
  charLength?: number[];
}
