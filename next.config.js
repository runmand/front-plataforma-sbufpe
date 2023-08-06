/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET
  },
};

module.exports = nextConfig;
