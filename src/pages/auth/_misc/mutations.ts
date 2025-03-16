import axios from "@/utils/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AdminLoginDTO } from "../login/_misc/components/LoginFormAdmin";
import { IAdminLogin } from "./type";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["Register"],
    mutationFn: async (payload: any) => {
      const response = await axios.post("/auth/register", payload);
      return response.data.data as IAdminLogin;
    },
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationKey: ["admin_login"],
    mutationFn: async (payload: AdminLoginDTO) => {
      const response = await axios.post("/auth/login", payload);

      return response.data.data as IAdminLogin;
    },
  });
};
