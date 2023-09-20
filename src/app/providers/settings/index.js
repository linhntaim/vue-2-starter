import {env, localization as config} from '@/config'
import {createSettings, I18LocaleHandler} from '@/app/support/settings'

const localeHandler = new I18LocaleHandler(
    locale => import(/* webpackChunkName: "lang-[request]" */ `@/lang/${locale}.js`).then(messages => messages.default),
    config.locale.supported,
)

export const i18n = localeHandler.createI18Provider(env, {
    locale: config.locale.default,
    fallbackLocale: config.locale.fallback,
})
export const settings = createSettings({
    localeHandler,
    localeApply: function (locale, changed, app) {
        if (changed) {
            document.querySelector('html').setAttribute('lang', locale)
            app.$log.debug('locale', 'applied', locale)
        }
        else {
            app.$log.debug('locale', 'no need to apply')
        }
    },
    commonApply: async function (settings, changes, app) {
        if (Object.keys(changes).some(key => changes[key])) {
            await app.$cookie.put('settings', (() => {
                const values = {}
                Object.keys(settings).forEach(key => settings[key] && (values[key] = settings[key]))
                return values
            })())
            app.$log.debug('settings', 'applied', settings)
        }
        else {
            app.$log.debug('settings', 'no need to apply')
        }
    },
})
