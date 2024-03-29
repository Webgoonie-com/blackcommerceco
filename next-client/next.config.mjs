/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
    // This could be anything, using the latest git hash
      return process.env.GIT_HASH
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    config.infrastructureLogging = { debug: /PackFileCache/ };
  
    let  modularizeImports = null;
         config.module.rules.some((rule) =>
         rule.oneOf?.some((oneOf) => {
         modularizeImports =
           oneOf?.use?.options?.nextConfig?.modularizeImports;
         return modularizeImports;
      }),
     );
  
     if (modularizeImports?.["@headlessui/react"]) {
       delete modularizeImports["@headlessui/react"];
     }
  
      return config;
    },
    output: 'export',
    //distDir: 'dist',
    images: {
    //   domains: [
    //     "next/image",
    //     "tailwindui.com",
    //     "images.unsplash.com",
    //     "uko-react.vercel.app",
    //     "localhost",
    //     "localhost:3333",
    //     "localhost:3334",
    // ],
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
