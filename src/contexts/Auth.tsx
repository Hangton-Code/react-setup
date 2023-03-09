import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAuth0LogInUrl from "../utils/getAuth0LogInUrl";
import useAxios from "../utils/useAxios";

type AUTH_STATE = "loading" | "authed" | "unauthed";

const AuthContext = createContext({
  authState: "loading" as AUTH_STATE,
  setAuthState: (() => {}) as React.Dispatch<React.SetStateAction<AUTH_STATE>>,
  accessToken: "",
  setAccessToken: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});

function useAuth() {
  return useContext(AuthContext);
}

const AuthControllerContext = createContext({
  logIn: () => {},
  logOut: () => {},
});

function useAuthController() {
  return useContext(AuthControllerContext);
}

type ContextProp = {
  children: ReactNode;
};

function AuthProvider({ children }: ContextProp) {
  const [authState, setAuthState] = useState("loading" as AUTH_STATE);
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        accessToken,
        setAccessToken,
      }}
    >
      <AuthControllerContextProvider>{children}</AuthControllerContextProvider>
    </AuthContext.Provider>
  );
}

function AuthControllerContextProvider({ children }: ContextProp) {
  const axios = useAxios();
  const navigate = useNavigate();
  const { setAuthState, setAccessToken } = useAuth();

  const logIn = () => {
    window.location.href = getAuth0LogInUrl();
  };

  const logOut = async () => {
    const res = await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/auth/log_out`,
      method: "POST",
      data: {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    });
    if (!res) return;

    navigate("/");

    localStorage.removeItem("refreshToken");
    setAuthState("unauthed");
    setAccessToken("");
  };

  return (
    <AuthControllerContext.Provider
      value={{
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthControllerContext.Provider>
  );
}

export default AuthProvider;
export { useAuth, useAuthController };
