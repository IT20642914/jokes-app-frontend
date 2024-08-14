import { FormFieldDto } from ".";

export interface loginPayload {
  email: string;
  password: string;
}
export interface loginFormDto {
  email: FormFieldDto<string>;
  password: FormFieldDto<string>;
}
