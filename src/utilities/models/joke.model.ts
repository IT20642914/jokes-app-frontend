"use client";
import { FormFieldDto } from ".";

export interface JokeFormDto {
  setup: FormFieldDto<string>;
  punchline: FormFieldDto<string>;
  type: FormFieldDto<string>;
  author: FormFieldDto<string>;
}
export interface JokeSubmitFormDto {
  _id: FormFieldDto<string>;
  setup: FormFieldDto<string>;
  punchline: FormFieldDto<string>;
  type: FormFieldDto<JokeTypeDto>;
  author: FormFieldDto<string>;
  status: FormFieldDto<string>;
}

export interface JokeDto {
  setup: string;
  punchline: string;
  type: string;
  author: string;
  _id?: string;
  status?: string;
}

export interface JokeTypeDto {
  _id?: string;
  name: string;
}
