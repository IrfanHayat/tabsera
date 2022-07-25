module.exports = {
  async headers() {
    return [
      // {
      //   source: "/(.*)?", // Matches all pages
      //   headers: [
      //     {
      //       key: "X-Frame-Options",
      //       value: "DENY",
      //     },
      //   ],
      // },
    ];
  },
 distDir: 'build',
  reactStrictMode: true,
  //useFileSystemPublicRoutes: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "b.zmtcdn.com",
      "tijaricloud.com",
      // "localhost:3000",
    ],
  },
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    BackEndUrl: process.env.BackEndUrl,
  },
  // reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com", "b.zmtcdn.com"] },
};

// module.exports = withImages({
//   webpack(config, options) {
//     return config
//   }
// })
