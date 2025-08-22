import withNextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "io-tech.up.railway.app",
      },
    ],
  },
};

export default withNextIntl()(nextConfig);
