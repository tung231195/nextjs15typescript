import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return <Box sx={{ height: "100vh" }}>{children}</Box>;
}
