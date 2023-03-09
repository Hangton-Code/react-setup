import axios from "axios";
import { useAuth } from "../contexts/Auth";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function useAxios() {
  const { accessToken, setAccessToken, setAuthState } = useAuth();

  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!req.withAuth) return req;

    // if accesstoken is here
    if (accessToken) {
      // and is not expired (still valid)
      const token = jwt_decode(accessToken) as any;
      if (token) {
        const isExpired = new Date().getTime() >= token.exp;
        if (!isExpired) return req;
      }
    }

    // if not, refresh the token
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      // but still, if there is no refreshToken existed, then ...
      setAccessToken("");
      setAuthState("unauthed");
      return req;
    }

    const res = (await axios({
      url: `${SERVER_URL}/auth/refresh_token`,
      method: "POST",
      data: {
        refreshToken,
      },
    })
      .then((res) => {
        if (res.status !== 200) return false;
        const data = res.data;
        return {
          newRefreshToken: data.refreshToken,
          newAccessToken: data.accessToken,
        };
      })
      .catch((err) => false)) as
      | false
      | {
          newRefreshToken: string;
          newAccessToken: string;
        };

    if (!res) {
      // here means the refresh token is invalid
      localStorage.removeItem("refreshToken");
      setAccessToken("");
      setAuthState("unauthed");
      return req;
    }

    // reset
    localStorage.setItem("refreshToken", res.newRefreshToken);
    setAccessToken(res.newAccessToken);
    setAuthState("authed");
    req.headers.Authorization = `Bearer ${res.newAccessToken}`;
    return req;
  });

  axiosInstance.interceptors.response.use(
    function (res) {
      return res;
    },
    function (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error("Client Error");
            break;
          case 500:
            toast.error("Server Error");
            break;
          default:
            break;
        }
      }
      if (!window.navigator.onLine) {
        toast.error("Network Error");
      }
      return false;
    }
  );

  return axiosInstance;
}

export default useAxios;
