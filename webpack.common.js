const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            favicon: 'src/favicon.ico',
            template: "./src/app.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'nav.html',
            template: './src/nav.html',
            chunks: ['noEntry']
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/standing.html',
            template: './src/pages/standing.html',
            chunks: ['noEntry']
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/teams.html',
            template: './src/pages/teams.html',
            chunks: ['noEntry']
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/welcome.html',
            template: './src/pages/welcome.html',
            chunks: ['noEntry']
        }),
        new WebpackPwaManifest({
            "name": "Football Pocket",
            "gcm_sender_id": "403108446847",
            "short_name": "FPocket",
            "description": "Free Football Apps",
            "start_url": ".",
            "display": "standalone",
            "background_color": "#f57c00",
            "theme_color": "#f57c00",
            "ios": true,
            "inject": true,
            "icons": [
                {
                    "src": "src/assets/icon/icon-48.png",
                    "sizes": "48x48",
                    "type": "image/png",
                    "purpose": "any maskable",
                    destination: path.join('icons')
                },
                {
                    "src": "src/assets/icon/icon-96.png",
                    "sizes": "96x96",
                    "type": "image/png",
                    "purpose": "any maskable",
                    destination: path.join('icons')
                },
                {
                    "src": "src/assets/icon/icon-192.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any maskable",
                    destination: path.join('icons')
                },
                {
                    "src": "src/assets/icon/icon-192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any maskable",
                    ios: true,
                    destination: path.join('icons', 'ios')
                }
            ]
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/script/service-worker/init.js'),
            filename: 'service-worker.js'
        })
    ]
}

