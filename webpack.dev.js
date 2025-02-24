// Import common configuration, merge utility, and necessary plugins
const common = require("./webpack.common.js"),
    { merge } = require("webpack-merge"),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin"),
    path = require("path");

module.exports = merge(common, {
    // Set the environment mode to development for better debugging
    mode: "development",

    // Enable source maps for easier debugging during development
    devtool: "source-map",

    // Module rules to handle different file types
    module: {
        rules: [
            {
                // Process SCSS files (both .scss and .sass files) using these loaders
                test: /\.s[ac]ss$/i, 
                use: ["style-loader", "css-loader", "sass-loader"]  // Use these loaders in order: style-loader, css-loader, and sass-loader
            }
        ]
    },

    // Configuration for the output files
    output: {
        filename: 'bundle.js', // The name of the bundled JavaScript file
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundled files
        libraryTarget: 'var', // Output format (use 'var' to expose a global variable)
        library: 'Client', // The global variable that will store the exported code
        clean: true, // Clean up the dist folder before building
    },

    // Optimization settings to minimize the size of the final output
    optimization: {
        minimizer: [
            // Use the CssMinimizerPlugin to minify CSS files
            new CssMinimizerPlugin(),
        ],
        minimize: true,  // Enable minimization of the output files (both JS and CSS)
    },
})
