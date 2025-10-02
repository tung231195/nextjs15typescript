import ContentDashBoard from "@/app/components/dashboard/PageDashBoard";
import FooterLayout from "@/app/components/FooterLayout";
import HeaderLayout from "@/app/components/HeaderLayout";
import { Container } from "@mui/material";
import { ReactNode } from "react";
export type DashboardLayoutProps = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Container maxWidth="xl">
      <HeaderLayout />
      <ContentDashBoard>{children}</ContentDashBoard>
      <FooterLayout />
    </Container>
  );
}
