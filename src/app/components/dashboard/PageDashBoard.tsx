"use client";

import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import Content from "./Content";
import { DashboardLayoutProps } from "@/app/[locale]/dashboard/layout";

const ContentDashBoard = ({ children }: DashboardLayoutProps) => {
  return (
    <Grid sx={{ height: "100vh" }} container spacing={2}>
      <Grid size={3} sx={{ border: "1px solid #ccc" }}>
        <SideBar />
      </Grid>
      <Grid size={9} sx={{ border: "1px solid #ccc" }}>
        <Content>{children}</Content>
      </Grid>
    </Grid>
  );
};
export default ContentDashBoard;
