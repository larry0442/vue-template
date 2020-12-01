const proxyURL = 'http://127.0.0.1:7001';
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    port: 8080,
    proxy: {
      '/api': {
        target: proxyURL,
        changeOrigin: true,
        ws: false,
        headers: {
          referer: proxyURL,
          orgin: proxyURL,
        },
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
};
