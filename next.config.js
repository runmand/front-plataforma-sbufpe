/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ["@react-pdf/renderer"],
    env: {
        API_URL: process.env.API_URL,
    },
};

module.exports = nextConfig;
