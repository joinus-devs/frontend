/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
