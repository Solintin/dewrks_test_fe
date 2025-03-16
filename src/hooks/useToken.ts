import { useSessionStorage } from "usehooks-ts";
export const useToken = () => {
  const [token, setToken, removeToken] = useSessionStorage<string>("TOKEN", "");

  return {
    setToken,
    token,
    removeToken,
  };
};
