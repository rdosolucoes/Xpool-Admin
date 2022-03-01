import Cookies from "js-cookie";
import { api } from "../api";

/**
 * DADOS DA API
 * http://xpool.com.br/swagger/index.html
 */


export type ShopData = {
  id: number;
  name: string;
  city: string;
  email: string;
  login: string;
};



export async function getShops() {
  const response = await api.get<ShopData[]>("/Shop/GetList");

  return response.data;
}

export async function getShop(id: number) {
  try {
    const response = await api.get<ShopData>(`Shop/GetById/${id}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
    };
  }
}





