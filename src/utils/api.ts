/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/provider/AuthProvider";
import baseApi from "./axios";



export const login = async (values: { email: string; password: string }) => {
  try {
    const { data } = await baseApi.post("/auth/login", values);
    return data; 
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
