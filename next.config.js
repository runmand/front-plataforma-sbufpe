/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    API_URL: "http://127.0.0.1:2000",
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
