
module.exports = {
  async headers() {
    return [
        {
            source: '/(.*)?', // Matches all pages
            headers: [
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                }
            ]
        }
    ]
},
    reactStrictMode: true,
    images: {
      domains: [
        "res.cloudinary.com",
        "b.zmtcdn.com",
        "tijaricloud.com",
        // "localhost:3000",
      ],
    },
 

  // reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com", "b.zmtcdn.com"] },
};


// module.exports = withImages({
//   webpack(config, options) {
//     return config
//   }
// })