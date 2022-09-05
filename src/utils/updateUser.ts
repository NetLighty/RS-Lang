import { AxiosResponse } from 'axios';
import UserService from '~/api/userService';
import { IUserUpdate } from '~/models/IUser';
import { getDocumentElement } from './subGameFunc';

export async function updateUserParam(
  userId: string,
  email: string,
  password: string,
) {
  try {
    const response:AxiosResponse = await UserService.updateUser(userId, email, password);
    const data = (await response.data) as IUserUpdate;
    return data;
  } catch (error) {
    return error;
  }
}

export function showForm() {
  const password = getDocumentElement('.fild__password')[0];
  password.classList.add('password-active');
  const emailFild = getDocumentElement('.fild__email-input')[0] as HTMLInputElement;
  emailFild.removeAttribute('disabled');
  const saveButton = getDocumentElement('.save-updateuser')[0];
  saveButton.classList.add('save-active');
  const btn = getDocumentElement('.user__control_change')[0];
  btn.setAttribute('disabled', 'true');
  const exit = getDocumentElement('.user__control_exit')[0];
  exit.classList.add('hidden-exit');
}
export async function updateUser(
  userId: string,
) {
  const passwordFild = getDocumentElement('.fild__password')[0] as HTMLInputElement;
  passwordFild.classList.remove('password-active');
  const password = passwordFild.value;
  const emailFild = getDocumentElement('.fild__email-input')[0] as HTMLInputElement;
  emailFild.setAttribute('disabled', 'true');
  const email = emailFild.value;
  const saveButton = getDocumentElement('.save-updateuser')[0];
  saveButton.classList.remove('save-active');
  const btn = getDocumentElement('.user__control_change')[0];
  btn.removeAttribute('disabled');
  const exit = getDocumentElement('.user__control_exit')[0];
  exit.classList.remove('hidden-exit');
  await updateUserParam(userId, email, password);
  passwordFild.value = '';
}
