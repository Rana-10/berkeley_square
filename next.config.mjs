/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdfkit", "pg", "reflect-metadata", "typeorm"],
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 78, 80, 85, 90, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/reviews",
        destination: "/",
        permanent: true
      },
      {
        source: "/track-record",
        destination: "/",
        permanent: true
      }
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;
