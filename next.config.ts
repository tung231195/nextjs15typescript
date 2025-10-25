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
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:5000/uploads/:path*", // proxy từ frontend -> backend
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: false, // ⛔ Bỏ qua lỗi eslint khi deploy
  },
};

export default withNextIntl(config);
