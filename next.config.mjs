/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gambar statis tanpa Image Optimization Vercel (kuota tim habis, /_next/image dibalas 402). Menu ini memakai
  // ilustrasi SVG, jadi manifesnya kosong; kalau nanti ada foto raster di public/images, jalankan:
  //   node scripts/static-images.mjs . --dirs public/images
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  async headers() {
    return [{ source: '/_img/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }];
  },
};

export default nextConfig;
