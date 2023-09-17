const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: {
        resolve: {
            fallback: {
                //
            },
        },
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'lang',
            enableInSFC: false,
            enableBridge: false,
        },
    },
})
