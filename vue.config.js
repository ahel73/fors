/* eslint-disable no-debugger,no-console,no-template-curly-in-string */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/housing-subsidies-frontend' : '/',

  transpileDependencies: ['vuetify'],

  devServer: {
    proxy: {
      '^/housing-subsidies/api': {
        target: 'https://mgp-dev.fors.ru',
      },
      '^/security/api': {
        target: 'https://mgp-dev.fors.ru',
      },
      '^/file-repository-service': {
        target: 'https://mgp-dev.fors.ru',
      },
    },
  },
};
