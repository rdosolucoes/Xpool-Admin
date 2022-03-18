import Cookies from "js-cookie";
import { api } from "../api";

/**
 * DADOS DA API
 * http://xpool.com.br/swagger/index.html
 */


export type TransactionData = {
  id: number;
  supplier: string;
  amount: number;
  type: string;
  shop: string;
  formatDate: string;
  date: Date;
  status: string;
};



export async function getTransactions() {
  const response = await api.get<TransactionData[]>("/Financial/GetTransactions");

  return response.data;
}







