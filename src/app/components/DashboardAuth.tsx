"use client";

import ContentDashBoard from "@/app/components/dashboard/PageDashBoard";
import ReactQueryProvider from "@/app/components/dashboard/ReactQueryProvider";
import FooterLayout from "@/app/components/FooterLayout";
import { useAuthContext } from "@/app/context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import PermissionPage from "./401";

export type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardAuth({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && (!user || !["admin", "superadmin"].includes(user.role))) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  // Không có quyền
  if (!user || !["admin", "superadmin"].includes(user.role)) {
    return <PermissionPage />;
  }

  // Có quyền, render nội dung dashboard
  return (
    <Box>
      <ReactQueryProvider>
        <ContentDashBoard>{children}</ContentDashBoard>
        <FooterLayout />
      </ReactQueryProvider>
    </Box>
  );
}
