/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'abiastate.gov.ng',
        port: '',
        pathname: '/wp-content/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
