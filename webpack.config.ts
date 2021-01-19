import path from 'path';
import { Configuration } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const setPath = (arrPaths: string[]): string => {
  return path.resolve(__dirname, ...arrPaths);
};

const config: Configuration = {
  entry: setPath(['src', 'index.tsx']),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/, /build/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: 'stylelint-custom-processor-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: setPath(['public', 'index.html']),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*',
      },
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  output: {
    path: setPath(['build']),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: 'vendors.[hash].js',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    contentBase: setPath(['build']),
    compress: true,
    port: 3000,
  },
};

export default config;
