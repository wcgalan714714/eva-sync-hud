import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      { source: '/classic', destination: '/cinematic/index.html', permanent: false },
    ];
  },
};

export default nextConfig;