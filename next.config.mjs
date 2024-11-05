/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), '_NOT-LIVE-PAGES'];
        return config;
    },
    // Ignore _NOT-LIVE-PAGES during the build
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;