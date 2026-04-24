const nextConfig = {
    reactStrictMode: false,
    swcMinify: false,
    env: {
        API_URL: process.env.API_URL,
    },
};

module.exports = nextConfig;
