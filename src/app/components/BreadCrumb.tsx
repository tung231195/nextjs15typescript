"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return { href, label };
  });

  //const isHomePage = segments.length === 0 || /^[a-z]{2}$/.test(segments[0]);
  //if (isHomePage) return;
  return (
    <div className="my-4">
      <Breadcrumbs
        sx={{ mt: 2 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href="/" style={{ color: "#1976d2", textDecoration: "none" }}>
          Home
        </Link>
        {crumbs.map((crumb, i) =>
          i === crumbs.length - 1 ? (
            <Typography key={i} color="text.primary">
              {crumb.label}
            </Typography>
          ) : (
            <Link key={i} href={crumb.href} style={{ color: "#1976d2", textDecoration: "none" }}>
              {crumb.label}
            </Link>
          ),
        )}
      </Breadcrumbs>
    </div>
  );
}
