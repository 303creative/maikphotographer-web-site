// Next.js config (if migrating to Next.js in future)
// For now, this serves as documentation of optimization targets

module.exports = {
  images: {
    domains: [
      'images.pexels.com',
      'maikphotographer.com',
      'www.maikphotographer.com'
    ],
    formats: ['image/avif', 'image/webp'],
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com cal.com app.cal.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' fonts.gstatic.com; connect-src 'self'"
          }
        ]
      }
    ];
  },

  // Performance optimizations
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,

  // Build optimization
  poweredByHeader: false,

  // Optimized builds
  optimizeFonts: true
};
