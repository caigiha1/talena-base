import { z } from 'zod';

const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const specialChar = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/;

export const signinSchema = z
  .object({
    email: z.string().min(1, {message: 'This field cannot be empty.'}).email(),
    password: z.string().min(1, {message: 'This field cannot be empty.'}),
  })
  .refine(({ password }) => password.length >= 8, {
    message: 'Must be at least 8 character',
    path: ['password'],
  });

export const signupSchema = z
  .object({
    email: z.string().min(1, {message: 'This field cannot be empty.'}).email(),
    password: z.string().min(8),
    first_name: z.string().min(1, {message: 'This field cannot be empty.'}),
    last_name: z.string().min(1, {message: 'This field cannot be empty.'}),
    confirmPassword: z.string().min(8),
    terms: z.boolean().default(false)
  })
  .superRefine(({ password, confirmPassword }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => upperCase.test(ch);
    const containsLowercase = (ch: string) => lowerCase.test(ch);
    const containsSpecialChar = (ch: string) => specialChar.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Invalid password',
      });
    }

    if (confirmPassword !== password) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      });
    }
  });

export const resetPassSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => upperCase.test(ch);
    const containsLowercase = (ch: string) => lowerCase.test(ch);
    const containsSpecialChar = (ch: string) => specialChar.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Invalid password',
      });
    }

    if (confirmPassword !== password) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });
