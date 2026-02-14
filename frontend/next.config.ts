import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel'de full Next.js features aktif
  images: {
    unoptimized: false, // Vercel Image Optimization kullanılacak
  },
  /* config options here */
};

export default nextConfig;
