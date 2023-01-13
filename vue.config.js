const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    }
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
  },
  publicPath: '/wp-content/plugins/acensform',
  css: {
    extract: {
        filename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    if(config.plugins.has('extract-css')) {
        const extractCSSPlugin = config.plugin('extract-css');
        extractCSSPlugin && extractCSSPlugin.tap(() => [
            {
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].css'
            }
        ]);
    }
  },
});
