// Import necessary dependencies and plugins for production configuration
const MiniCssExtractPlugin = require("mini-css-extract-plugin"), // Plugin to extract CSS into separate files
    TerserPlugin = require("terser-webpack-plugin"), // Plugin for minifying JavaScript
    path = require("path"), // Path module to handle directory and file paths
    common = require("./webpack.common.js"); // Import common configuration
const { merge } = require("webpack-merge"), // Merge utility for combining configurations
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin"), // Plugin to minimize CSS
    WorkboxPlugin = require("workbox-webpack-plugin"); // Plugin for service workers (for PWA)

module.exports = merge(common, {
    // Set the mode to 'production' for optimized builds
    mode: "production",

    // Generate hidden source maps for production to aid in debugging without exposing them
    devtool: "hidden-source-map",

    // Module rules for processing files
    module: {
        rules: [
            {
                // Handle SCSS and SASS files with the specified loaders
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // Load SCSS into separate CSS files for production
            },
        ],
    },

    // Output configuration for the final bundled files
    output: {
        filename: "bundle.[contenthash].js", // Use contenthash to generate unique file names based on content
        path: path.resolve(__dirname, "dist"), // Define the output directory for the built files
        libraryTarget: "var", // Expose the output as a global variable
        library: "Client", // Name of the global variable
        clean: true, // Clean the output directory before each build
    },

    // Optimization settings to minimize the output files
    optimization: {
        minimize: true, // Enable minimization for smaller output files
        minimizer: [
            new CssMinimizerPlugin(), // Minimize CSS files
            new TerserPlugin(), // Minimize JavaScript files
        ],
    },

    // Plugins to extend Webpack functionality
    plugins: [
        // Plugin to extract CSS into a separate file and enable caching with contenthash
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css", // Output CSS file with unique name based on content
        }),

        // Workbox plugin to generate service worker for Progressive Web App (PWA)
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true, // Claim clients immediately when the service worker is installed
            skipWaiting: true, // Skip waiting to activate the new service worker immediately
        }),
    ],
});
