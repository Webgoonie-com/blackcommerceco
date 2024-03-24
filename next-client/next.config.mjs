/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [
        "next/image",
        "tailwindui.com",
        "images.unsplash.com",
        "uko-react.vercel.app",
        "localhost",
        "localhost:3333",
        "localhost:3334",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "next/image",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "uko-react.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost:3333",
      },
      {
        protocol: "https",
        hostname: "localhost:3333",
      },
      {
        protocol: "http",
        hostname: "localhost:3334",
      },
      {
        protocol: "https",
        hostname: "localhost:3334",
      },
    ],
  }
};

export default nextConfig;
