import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"], // 👈 Add Vietnamese here
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      // de: "/pfadnamen",
      vi: "/duong-dan", // 👈 Add Vietnamese version
    },
  },
});
