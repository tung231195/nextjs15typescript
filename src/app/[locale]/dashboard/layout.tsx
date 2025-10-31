import ContentDashBoard from "@/app/components/dashboard/PageDashBoard";
import FooterLayout from "@/app/components/FooterLayout";
import { Box } from "@mui/material";
import { ReactNode } from "react";
export type DashboardLayoutProps = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box>
      {/* <HeaderLayoutAdmin open={open} toggleDrawer={toggleDrawer} /> */}
      <ContentDashBoard>{children}</ContentDashBoard>
      <FooterLayout />
    </Box>
  );
}
