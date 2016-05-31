module.exports = {
    entry: {
        "react-easy-store": './src/index.js'
    },
    output: {
        path: './dist',
        filename: '[name].js',
        library: 'reactEasyStore',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
};