import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fruitio.monamedia.net',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '116.104.51.101',
                port: '8080',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's3minio.unilife.io.vn', // <-- bỏ https://
                port: '',
                pathname: '/**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_API_MINIO_URL: process.env.NEXT_PUBLIC_API_MINIO_URL,
    },
    typescript: {
        ignoreBuildErrors: true, // ✅ Bỏ qua lỗi TypeScript khi build
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ (nếu chưa thêm)
    },
};

export default nextConfig;
