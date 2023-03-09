import { Container } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Head from "./Head";
import Tabs from "./Tabs";

function SettingPage() {
  const location = useLocation();

  if (location.pathname === "/setting")
    return <Navigate to={"/setting/account"} />;

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Head />
      <Tabs />
    </Container>
  );
}

export default SettingPage;
