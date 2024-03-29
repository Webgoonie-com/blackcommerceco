/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { webpack }) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.infrastructureLogging = { debug: /PackFileCache/ };

    let modularizeImports = null;
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports =
          oneOf?.use?.options?.nextConfig?.modularizeImports;
        return modularizeImports;
      })
    );

    if (modularizeImports?.["@headlessui/react"]) {
      delete modularizeImports["@headlessui/react"];
    }

    // Limit webpack workers to 1
    config.plugins.push(new webpack.LoaderOptionsPlugin({ options: { maxWorkers: 1 } }));

    return config;
  },
  distDir: 'dist',
  images: {
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
  },
};

export default nextConfig;
