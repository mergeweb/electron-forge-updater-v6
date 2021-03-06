const WebpackPlugin = require('@electron-forge/plugin-webpack').default;
const path = require('path');

const sharedModule = {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react']
                }
            }
        }
    ]
};

module.exports = new WebpackPlugin({
    mainConfig: {
        entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
        module: sharedModule
    },
    renderer: {
        config: {
            module: sharedModule,
            resolve: {
                extensions: ['.js', '.jsx', '.json']
            }
        },
        prefixedEntries: process.env.NODE_ENV === 'production' ? [] : ['react-hot-loader/patch'],
        entryPoints: [
            {
                name: 'Main Window',
                html: path.resolve(__dirname, 'src/index.html'),
                js: path.resolve(__dirname, 'src/renderer.jsx')
            }
        ]
    }
});
