/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com', 'www.proracingsimulators.co.uk', 'www.diehardrc.com'],
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/MCRacingSimFWWeb' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/MCRacingSimFWWeb/' : '',
}

module.exports = nextConfig
