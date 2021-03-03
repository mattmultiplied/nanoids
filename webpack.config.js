const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: {
        game: '/nanoids/GameConfig.js'
    },

    output: {
        
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    
    },

    module: {

        rules: [

            {

            test: /\.js$/,

            include: path.resolve(__dirname, 'src/'),

            use: {

                loader: 'babel-loader',
                options: {
                presets: ['env']

                }
            }

            },

            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3|wav|ogg)$/i,
                type: 'asset/resource',
            
            }

        ]
    },

};

