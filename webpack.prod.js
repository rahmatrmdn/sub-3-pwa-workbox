const { merge } = require("webpack-merge");
const common = require("./webpack.common");

// Tidak memakai Babel karena Regenerator-runtime terjadi bug (undefined) [https://github.com/GoogleChrome/workbox/issues/2493]
// saat memakai workbox
module.exports = merge(common, {
    mode: "production"
})
