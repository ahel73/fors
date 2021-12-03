/* eslint-disable no-debugger,no-console,no-template-curly-in-string */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/housing-subsidies' : '/',

  transpileDependencies: ['vuetify'],

  devServer: {
    proxy: {
      '^/configurator/api': {
        target: 'https://mgp-dev.fors.ru/configurator/api',
        changeOrigin: true,
        pathRewrite: { '^/configurator/api': '' },
      },
      '^/housing-subsidies/api': {
        target: 'https://mgp-dev.fors.ru',
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
