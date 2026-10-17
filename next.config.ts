import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  transpilePackages: ["baseui", "styletron-react", "styletron-engine-monolithic"],
};

export default nextConfig;
