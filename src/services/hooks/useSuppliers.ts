import Cookies from "js-cookie";
import { api } from "../api";

/**
 * DADOS DA API
 * http://xpool.com.br/swagger/index.html
 */


export type SupplierData = {
  id: number;
  name: string;
  city: string;
  email: string;
  login: string;
};



export async function getSuppliers() {
  const response = await api.get<SupplierData[]>("/Supplier/GetList");

  return response.data;
}

export async function getSupplier(id: number) {
  try {
    const response = await api.get<SupplierData>(`Supplier/GetById/${id}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Erro na API",
    };
  }
}





