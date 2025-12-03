import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const config: NextConfig = {
  images: {
    domains: ["localhost"], // backend domain
  },
  async rewrites() {
    const BACKEND_URL =
      process.env.IS_DOKER === "true"
        ? process.env.NEXT_PUBLIC_BACKEND_DOCKER_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL;
    return [
      {
        source: "/uploads/:path*",
        destination: `${BACKEND_URL}/uploads/:path*`, // proxy từ frontend -> backend
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: false, // ⛔ Bỏ qua lỗi eslint khi deploy
  },
};

export default withNextIntl(config);
