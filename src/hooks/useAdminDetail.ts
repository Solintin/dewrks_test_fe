import { User } from "@/pages/auth/_misc/type";
import { useSessionStorage } from "usehooks-ts";
export const useAdminDetail = () => {
  const [adminLogin, setAdminLogin, removeAdminLogin] = useSessionStorage<User>(
    "admin_details",
    {} as User,
  );

  return {
    setAdminLogin,
    adminLogin,
    removeAdminLogin,
  };
};
