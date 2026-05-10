/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 2, 
    memoryBasedWorkersCount: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;