import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab } from "@mui/material";
import React, { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const routes = [
  {
    name: "Account",
    path: "account",
    value: 0,
  },
  {
    name: "General",
    path: "general",
    value: 1,
  },
];

function Tabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const value = useMemo(() => {
    const path = location.pathname.replace("/setting/", "");
    return routes.filter((v) => v.path === path)[0].value.toString();
  }, [location.pathname]);

  function handleChange(
    e: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) {
    navigate(`/setting/${routes[Number(newValue)].path}`);
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {routes.map((route, i) => {
            console.log(i);
            return <Tab key={i} label={route.name} value={i.toString()} />;
          })}
        </TabList>
      </Box>
      <TabPanel value={value}>
        <Outlet />
      </TabPanel>
    </TabContext>
  );
}

export default Tabs;
