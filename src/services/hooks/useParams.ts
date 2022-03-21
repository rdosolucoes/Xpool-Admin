import Cookies from "js-cookie";
import { api } from "../api";

/**
 * DADOS DA API
 * http://xpool.com.br/swagger/index.html
 */


type DefaultResponse = {
  success: boolean;
  msg?: string;
};

type ParamData = {
  referenceValue: number;
  transferValue: number;
};


export async function saveParam(value :ParamData) {
  try {
    const response = await api.post<DefaultResponse>(
     'Param/Save', value
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
    };
  }
}

export async function getParam() {
  const response = await api.get<ParamData[]>("/Param/Get");

  return response.data;
}

