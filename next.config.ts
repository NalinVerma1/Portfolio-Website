import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /v3 was the preview route while the redesign was in progress; it is now
  // the site itself, so old preview links land on the homepage rather than a 404.
  async redirects() {
    return [{ source: "/v3", destination: "/", permanent: true }];
  },
};

export default nextConfig;
