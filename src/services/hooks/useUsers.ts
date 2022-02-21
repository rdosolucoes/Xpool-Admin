import Cookies from "js-cookie";
import { api } from "../api";

/**
 * DADOS DA API
 * http://xpool.com.br/swagger/index.html
 */

type SignInData = {
  authenticated: boolean;
  created: string;
  expiration: string;
  accessToken: string;
  refreshToken: string;
  typeUser: 2;
  name: string;
  image: string;
};

type SignInResponse = {
  success: boolean;
  msg?: string;
  data: SignInData;
};

export type UserData = {
  active: boolean;
  changeDate: string;
  creationDate: string;
  id: number;
  login: string;
  partnerships?: null;
  password: string;
  playerId?: number;
  refreshToken?: string;
  refreshTokenExpiryTime?: string;
  typeUser: number;
  userInfo?: string;
  userInfoId?: number;
};

export async function signIn(login: string, password: string) {
  try {
    const response = await api.post<SignInResponse>(
      `User/SignIn?login=${login}&password=${password}`
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
      data: undefined,
    };
  }
}

export async function createUser(login: string, password: string) {
  try {
    const response = await api.post<SignInResponse>(
      `User/Register?login=${login}&password=${password}`
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
    };
  }
}

export async function getUsers() {
  const response = await api.get<UserData[]>("/User/FindAll");

  return response.data;
}

export async function getUser(id: number) {
  try {
    const response = await api.get<UserData>(`User/FindId/${id}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
    };
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await api.get<any>(`User/Delete/${id}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
    };
  }
}

export function getTokken() {
  const accessToken = Cookies.get("accessToken");
  
  return accessToken;
}

export function isLogged() {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) return false;
  
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return true;
}
