import {I18LocaleHandler} from '@/app/support/settings'
import {localization as config} from '@/config'
import {Settings} from '@/app/support/settings/settings'
import {str} from '@/app/support/helpers'

const localeHandler = new I18LocaleHandler(config.locale.supported)
const settings = new Settings()
    .setLocaleHandler(localeHandler)

export const i18n = localeHandler.createI18Provider({
    locale: config.locale.default,
    fallbackLocale: config.locale.fallback,
})
export const localization = {
    installer: {
        install(app) {
            settings
                .setLocaleApply((locale, changed) => {
                    if (changed) {
                        document.querySelector('html').setAttribute('lang', locale)
                        app.prototype.$request.with('starter', axios => {
                            axios.defaults.headers.common['Accept-Language'] = locale
                            return axios
                        }, 'header.accept-language')
                        app.prototype.$log.debug('locale', 'applied', locale)
                    }
                    else {
                        app.prototype.$log.debug('locale', 'no need to apply')
                    }
                })
                .setCommonApply(async (settings, changes) => {
                    if (Object.keys(changes).some(key => changes[key])) {
                        app.prototype.$request.with('starter', axios => {
                            axios.defaults.headers.common['X-Settings'] = (() => {
                                const values = {}
                                Object.keys(settings).forEach(key => settings[key] && (values[str.snake(key)] = settings[key]))
                                return JSON.stringify(values)
                            })()
                            return axios
                        }, 'header.x-settings')
                        await app.prototype.$cookie.put('settings', (() => {
                            const values = {}
                            Object.keys(settings).forEach(key => settings[key] && (values[key] = settings[key]))
                            return values
                        })())
                        app.prototype.$log.debug('settings', 'applied', settings)
                    }
                    else {
                        app.prototype.$log.debug('settings', 'no need to apply')
                    }
                })

            app.prototype.$settings = settings
            app.prototype.$setLocale = locale => {
                app.prototype.$log.debug('locale', 'applying', locale)
                return settings.setLocale(locale).apply()
            }
        },
    },
}
