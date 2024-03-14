/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: [
      "ui.shadcn.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com"
    ],
    remotePatterns: [
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
        protocol: "http",
        hostname: "localhost:3333",
      },
      {
        protocol: "http",
        hostname: "localhost:3334",
      },
    ],
  }
};

export default nextConfig;
