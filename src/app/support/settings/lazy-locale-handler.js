import {LocaleHandler} from './locale-handler'

export class LazyLocaleHandler extends LocaleHandler
{
    constructor(localeLoader, supportedLocales = []) {
        super(supportedLocales)

        this.localeLoader = localeLoader
    }

    loadLocaleData(data, locale) {
        this.loadedLocales.push(locale)
        return this.applyLocale(locale)
    }

    setUnloadedLocale(locale) {
        return this.localeLoader(locale, this)
            .then(data => this.loadLocaleData(data, locale))
    }
}
