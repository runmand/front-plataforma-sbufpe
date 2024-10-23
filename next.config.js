/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    API_URL: 'http://localhost:2000',
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
