import {env, localization as config} from '@/config'
import {registerGlobalPropertyFactory, str} from '@/app/support/helpers'
import {I18LocaleHandler, Settings} from '@/app/support/settings'

const localeHandler = new I18LocaleHandler(config.locale.supported)
const settings = new Settings()
    .setLocaleHandler(localeHandler)

export const i18n = localeHandler.createI18Provider(env, {
    locale: config.locale.default,
    fallbackLocale: config.locale.fallback,
})
export const localization = {
    installer: {
        install(Vue) {
            registerGlobalPropertyFactory(Vue, '$settings', function (app) {
                settings
                    .setLocaleApply((locale, changed) => {
                        if (changed) {
                            document.querySelector('html').setAttribute('lang', locale)
                            app.$request.mod('starter', axios => {
                                axios.defaults.headers.common['Accept-Language'] = locale
                                return axios
                            })
                            app.$log.debug('locale', 'applied', locale)
                        }
                        else {
                            app.$log.debug('locale', 'no need to apply')
                        }
                    })
                    .setCommonApply(async (settings, changes) => {
                        if (Object.keys(changes).some(key => changes[key])) {
                            app.$request.mod('starter', axios => {
                                axios.defaults.headers.common['X-Settings'] = (() => {
                                    const values = {}
                                    Object.keys(settings).forEach(key => settings[key] && (values[str.snake(key)] = settings[key]))
                                    return JSON.stringify(values)
                                })()
                                return axios
                            })
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
                    })
                return settings
            })
            registerGlobalPropertyFactory(Vue, '$setLocale', function (app) {
                return locale => {
                    app.$log.debug('locale', 'applying', locale)
                    return app.$settings.setLocale(locale).apply()
                }
            })
        },
    },
}
