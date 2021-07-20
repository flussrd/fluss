import * as models from "./models";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export async function getUsers(token: string): Promise<AxiosResponse<models.User[]>> {
  const modulesResponse = await axiosInstance.get<models.User[]>(`/account/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return modulesResponse;
}

export async function getUserById(
  userId: string,
  token: string
): Promise<AxiosResponse<models.User>> {
  const modulesResponse = await axiosInstance.get<models.User>(`/account/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return modulesResponse;
}

export async function registerUser(
  userForm: models.UserForm,
  token: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.post<models.UserForm, AxiosResponse<models.User>>(
    `/account/users`,
    userForm,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log({ response });

  return response;
}

