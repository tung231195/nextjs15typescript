import { Typography } from "@mui/material";
import PageLayout from "./PageLayout";

export default function PermissionPage() {
  return (
    <PageLayout>
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
        You has not privilige to access this page
      </Typography>
    </PageLayout>
  );
}
