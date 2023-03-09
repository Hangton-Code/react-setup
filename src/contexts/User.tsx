import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";

const UserContext = createContext({
  user: {} as UserType | null,
  profile: {} as UserProfile | null,
  reloadUser: async () => {},
});

type ContextProp = {
  children: ReactNode;
};

function UserContextProvider({ children }: ContextProp) {
  const axios = useAxios();
  const [user, setUser] = useState({} as UserType | null);
  const [profile, setProfile] = useState({} as UserProfile | null);
  const location = useLocation();

  // purpose:
  // 1. get user profile
  // 2. trigger a axios request of protected route via this event
  //    in order to config the authState and accessToken
  const reloadUser = async () => {
    const res = await axios({
      url: "/auth/info",
      withAuth: true,
    });
    if (!res) {
      setUser(null);
      setProfile(null);
    } else {
      setUser(res.data.user);
      setProfile(res.data.profile);
    }
  };

  // init
  useEffect(() => {
    // in case, user is in auth callback page, configging the refresh token,
    // we ought not request to prevent disturbing the auth context
    if (location.pathname === "/auth/callback") return;

    reloadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        reloadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export default UserContextProvider;
export { useUser };
