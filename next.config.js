/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.pixabay.com", "kr.object.ncloudstorage.com"],
  },
};

module.exports = nextConfig;
