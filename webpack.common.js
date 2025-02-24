const webpack = require("webpack"), 
    htmlWebpackPlugin = require("html-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // Entry point for the application
    entry: ["./src/client/index.js"],

    // Module rules for handling various file types
    module: {
        rules: [
            {
                // Apply babel-loader to all .js files except for node_modules
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
        ],
    },

    optimization: {
        // Optimization options to minimize output files
        minimizer: [
            // You can use additional minimizers like TerserPlugin if needed
            new CssMinimizerPlugin(),
        ],
        // Enable minimization of the output files
        minimize: true,
    },

    plugins: [
        // Plugin to generate HTML file from a template
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",  // Output file name
        }),

        // Plugin to clean up the output directory before building
        new CleanWebpackPlugin({
            // Simulate file removal (useful for debugging)
            dry: true, 
            // Disable logging of removal actions
            verbose: false,
            // Automatically remove unused Webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            // Do not protect Webpack assets from removal
            protectWebpackAssets: false,
        }),
    ]
}
