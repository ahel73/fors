/* eslint-disable no-debugger,no-console,no-template-curly-in-string */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/housing-subsidies' : '/',

  transpileDependencies: ['vuetify'],

  devServer: {
    proxy: {
      '^/housing-subsidies/api': {
        target: 'https://mgp-dev.fors.ru/housing-subsidies/api',
        changeOrigin: true,
        pathRewrite: { '^/housing-subsidies/api': '' },
      },
      '^/security/api': {
        target: 'https://mgp-dev.fors.ru',
      },
    },
  },

  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
};
