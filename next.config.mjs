/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '**',
                pathname: '**',
            },
        ],
    },
};

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    // eslint-disable-next-line no-undef
    enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
