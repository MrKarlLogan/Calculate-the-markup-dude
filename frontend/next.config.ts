import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: ["./src"],
    prependData: `@use "@app/styles/variables" as *; @use "@app/styles/mixins" as *;`,
  },
};

export default nextConfig;
