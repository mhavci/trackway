import webpack from 'webpack';
import {
  resolve
} from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
  CleanWebpackPlugin as CleanPlugin
} from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const dev = process.env.NODE_ENV === 'dev';

const plugins = [
  new CleanPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css'
  }),
  new HtmlPlugin({
    template: './public/index.html'
  }),
  new CopyPlugin({
    patterns: [
      'public/manifest.json'
    ],
  })
];
if (dev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

export default {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: './src/main.tsx',
  devServer: {
    compress: dev,
    open: false,
    overlay: true,
    historyApiFallback: true,
    hot: dev,
    port: 9000,
    writeToDisk: true
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: dev
            }
          }
        ]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'assets/img'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'assets/font'
          }
        }
      },
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
    chunkFilename: '[name].js'
  },
  plugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules', 'src'],
    alias: {
      components: resolve(__dirname, 'src/components'),
      reducers: resolve(__dirname, 'src/reducers'),
      sagas: resolve(__dirname, 'src/sagas'),
      selectors: resolve(__dirname, 'src/selectors'),
      utils: resolve(__dirname, 'src/utils')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 9
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          priority: -2,
          name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/
        },
        react: {
          priority: -1,
          name: 'vendor-react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react)/
        }
      }
    }
  }
};
