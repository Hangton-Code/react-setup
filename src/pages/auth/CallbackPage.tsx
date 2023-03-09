import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User";

function CallbackPage() {
  const { reloadUser } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refreshToken = searchParams.get("refresh_token") as string;

  useEffect(() => {
    (async () => {
      localStorage.setItem("refreshToken", refreshToken);

      // after setting the refrewsh token
      // reload user object (the original user object init was stopped)
      await reloadUser();

      navigate("/profile");
    })();
  }, []);

  return <></>;
}

export default CallbackPage;
