import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function ProtectedRoute() {
  const { authState } = useAuth();

  if (authState === "unauthed") return <Navigate to="/auth/log_in" />;
  if (authState === "loading") return <></>;
  return <Outlet />;
}

export default ProtectedRoute;
