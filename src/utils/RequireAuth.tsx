import React from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { getFromSessionStorage } from "./helper";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = getFromSessionStorage("token");
  const location = useLocation();
  if (!token) {
    toast.error("Access Denied, login required");
    window.open("/?callback=" + location.pathname, "_self");
    return null;
  } else {
    return <div>{children}</div>;
  }
};
