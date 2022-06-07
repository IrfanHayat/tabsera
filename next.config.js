const nextTrnaslate = require("next-translate");
module.exports = {
  ...nextTrnaslate({
    reactStrictMode: true,
    images: { domains: ["res.cloudinary.com", "b.zmtcdn.com","tijaricloud.com"] },
  }),

  // reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com", "b.zmtcdn.com"] },
};
