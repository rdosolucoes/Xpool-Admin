import Cookies from "js-cookie";
import { api } from "../api";

/**
 * DADOS DA API
 * http://xpool.com.br/swagger/index.html
 */


export type DashBoardData = {
  totalUsers: number;
  totalSuppliers: number;
  totalShops: number;
  totalReferences: number;
  totalCash: number;
  totalTransfer: number;
  totalGain: number;
};



export async function getDashboard() {
  const response = await api.get<DashBoardData>("/DashBoard/GetValues");

  return response.data;
}






