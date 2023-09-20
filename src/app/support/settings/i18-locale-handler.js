import {take} from '../helpers'
import {LazyLocaleHandler} from './lazy-locale-handler'
import VueI18n from 'vue-i18n'

export class I18LocaleHandler extends LazyLocaleHandler
{
    createI18Provider(env, options = {}) {
        return {
            installer: VueI18n,
            inject: () => ({
                i18n: take(
                    new VueI18n(
                        take(
                            Object.assign(
                                {
                                    locale: env.VUE_APP_I18N_LOCALE || 'en',
                                    fallbackLocale: env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
                                },
                                options || {},
                            ),
                            options => {
                                this.loadedLocales = Object.keys(options.messages || {})
                                this.locale = this.loadedLocales.length ? options.locale : null
                            },
                        ),
                    ),
                    i18n => this.i18n = i18n,
                ),
            }),
        }
    }

    applyLocale(locale) {
        this.i18n.locale = locale
        return super.applyLocale(locale)
    }

    loadLocaleData(data, locale) {
        this.i18n.setLocaleMessage(locale, data)
        return super.loadLocaleData(data, locale)
    }
}
