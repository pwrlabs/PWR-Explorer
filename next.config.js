/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.beehiiv.com/:path*', // Remove the '/v2' part
            },
        ];
    },
};

module.exports = nextConfig;