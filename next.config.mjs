/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in production
  productionBrowserSourceMaps: false,

  // Custom Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Only change the devtool setting in production
    if (!dev) {
      config.devtool = 'source-map';
    }

    // Additional Webpack configurations can be added here

    return config;
  },

  // Other potential settings
  reactStrictMode: false,
  swcMinify: true, // Use the faster SWC minifier
};

export default nextConfig;
