import * as Yup from 'yup';
import { minPasswordLength, minUsernameLength } from './authRules';

const eng = false;

const requiredMessage = eng ? 'Required' : 'Необходимо заполнить';
const invalidEmailMessage = eng ? 'Invalid email' : 'Некоректный адрес электронной почты';
const minPasswordLengthMessage = eng ? `Atlest ${minPasswordLength} characters long` : `Минимум ${minPasswordLength} символов`;
const minUsernameLengthMessage = eng ? `Atlest ${minUsernameLength} characters long` : `Минимум ${minUsernameLength} символов`;

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
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
