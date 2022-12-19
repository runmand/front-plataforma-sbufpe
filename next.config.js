/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: { API_URL: process.env.API_URL },
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config;
  }
};

module.exports = nextConfig;
