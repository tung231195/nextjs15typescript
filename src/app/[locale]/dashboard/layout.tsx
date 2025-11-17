import DashboardAuth from "@/app/components/DashboardAuth";
import { ReactNode } from "react";
export type DashboardLayoutProps = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardAuth>{children}</DashboardAuth>;
}
