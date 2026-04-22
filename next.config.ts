import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const basePath =
  isProduction && repositoryName && !isUserOrOrgPage
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined
};

export default nextConfig;
