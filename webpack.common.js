const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    resolve: {
        alias: {
            "barba": path.resolve('node_modules', 'barba.js/dist/barba.min'),
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {from:'src/assets/img',to:'assets/img'}
        ]),
        new CleanWebpackPlugin(['dist']),
        new HandlebarsPlugin({
            // path to hbs entry file(s)
            entry: path.join(process.cwd(), "src", "pages", "*.hbs"),
            // output path and filename(s). This should lie within the webpacks output-folder
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "dist", "[name].html"),
            // data passed to main hbs template: `main-template(data)`
            data: require("./src/data/projets.json"),

            // globbed path to partials, where folder/filename is unique
            partials: [
                path.join(process.cwd(), "src", "pages", "partials", "*.hbs")
            ],

            // hooks
            onBeforeSetup: function (Handlebars) {},
            onBeforeAddPartials: function (Handlebars, partialsMap) {},
            onBeforeCompile: function (Handlebars, templateContent) {},
            onBeforeRender: function (Handlebars, data) {},
            onBeforeSave: function (Handlebars, resultHtml, filename) {},
            onDone: function (Handlebars, filename) {}
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1} },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img'
                }
            }
        ]
    }
};