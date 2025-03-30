import { InjectionToken } from '@angular/core';

const ERROR_MESSAGES: Record<
  string,
  (args: { requiredLength?: number }) => string
> = {
  required: () => `This field is required`,
  requiredTrue: () => `This field is required`,
  email: () => `It should be a valid email`,
  minlength: ({ requiredLength }) =>
    `The length should be at least ${requiredLength} characters`,
  appPasswordShouldMatch: () => `Password should match`,
  passwordShouldMatch: () => `Password should match`,
  pattern: () => `Wrong format`,
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  `Validation Messages`,
  {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES,
  }
);
