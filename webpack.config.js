const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.bin$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'firmwares/[contenthash].[ext]'
                        }
                    },
                ]
            },
        ]
    }
};
