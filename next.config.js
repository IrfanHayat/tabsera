const nextTrnaslate = require("next-translate");
module.exports = {
  ...nextTrnaslate({
    reactStrictMode: true,
    images: {
      domains: [
        "res.cloudinary.com",
        "b.zmtcdn.com",
        "tijaricloud.com",
        "localhost:3000",
      ],
    },
  }),

  // reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com", "b.zmtcdn.com"] },
};
