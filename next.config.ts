import type { NextConfig } from "next";
import mongoose from "mongoose";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   esmExternals: "loose", // <-- add this
  // },
  serverExternalPackages: ['mongoose']

};

export default nextConfig;
