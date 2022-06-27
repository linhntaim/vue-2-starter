import {take} from '../helpers'
import {LocaleHandler} from './locale-handler'
import VueI18n from 'vue-i18n'

export class I18LocaleHandler extends LocaleHandler
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

    setUnloadedLocale(locale) {
        return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${locale}.js`)
            .then(messages => {
                this.i18n.setLocaleMessage(locale, messages.default)
                this.loadedLocales.push(locale)
                return this.applyLocale(locale)
            })
            .catch(() => Promise.resolve(this.locale))
    }
}
