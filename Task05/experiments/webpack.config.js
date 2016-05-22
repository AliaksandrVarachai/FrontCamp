module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },

    babel: {
        presets: ['es2015']
    },
    isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
            presets: ['es2015']  //for isparta only
        }
    },

    module: {
        loaders: [
            { //transpile all files except testing files
                test: /\.js$/,
                exclude: [
                    /(node_modules)/,
                    /(spec)/
                ],
                loader: 'babel'
            },
            { //transpile and instrument only testing sources
                //test: /\.spec\.js$/,
                //include: /(spec)/,
                test: /\.js$/,
                include: /(src)/,
                loader: 'isparta'
            }
        ]
    },
    devtool: 'source-map'
};