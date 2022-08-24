import * as Yup from 'yup';
import { minPasswordLength, minUsernameLength } from './authRules';

const requiredMessage = 'Required';
const invalidEmailMessage = 'Invalid email';
const minPasswordLengthMessage = `Atlest ${minPasswordLength} characters long`;
const minUsernameLengthMessage = `Atlest ${minUsernameLength} characters long`;

export const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(minUsernameLength, minUsernameLengthMessage)
    .max(25, 'Too Long!')
    .required(requiredMessage),
  password: Yup.string()
    .min(minPasswordLength, minPasswordLengthMessage)
    .max(25, 'Too Long!')
    .required(requiredMessage),
  email: Yup.string().email(invalidEmailMessage).required(requiredMessage),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(minPasswordLength, minPasswordLengthMessage)
    .max(25, 'Too Long!')
    .required(requiredMessage),
  email: Yup.string().email(invalidEmailMessage).required(requiredMessage),
});
