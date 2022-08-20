/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["openweathermap.org"],
  },
  env: {
    NEXT_PUBLIC_WEATHER_KEY: process.env.NEXT_PUBLIC_WEATHER_KEY,
  },
};

module.exports = nextConfig;
