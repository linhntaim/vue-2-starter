import {modify} from '../helpers'

export class Settings
{
    constructor(app, options = {}) {
        this.app = app
        this.settings = {
            locale: null,
            country: null,
            timezone: null,
            currency: null,
            numberFormat: null,
            longDateFormat: null,
            shortDateFormat: null,
            longTimeFormat: null,
            shortTimeFormat: null,
        }
        this.applied()

        this.localeHandler = 'localeHandler' in options ? options.localeHandler : null
        this.applies = {
            locale: 'localeApply' in options ? options.localeApply : null,
            common: 'commonApply' in options ? options.commonApply : null,
        }
    }

    applied() {
        this.appliedSettings = Object.assign({}, this.settings)
    }

    set(settings) {
        Object.keys(settings).forEach(key => {
            if (key in this.settings) {
                this.settings[key] = settings[key]
            }
        })
        return this
    }

    setLocale(locale) {
        this.settings.locale = locale
        return this
    }

    changes() {
        const changes = {}
        Object.keys(this.settings).forEach(
            key => changes[key] = this.settings[key] !== this.appliedSettings[key],
        )
        return changes
    }

    apply() {
        const changes = this.changes()
        return modify(this.localeHandler.setLocale(this.settings.locale), localePromise => {
            if (this.applies.locale) {
                return localePromise.then(async (locale) => {
                    await this.applies.locale(locale, changes.locale, this.app)
                    return locale
                })
            }
            return localePromise
        }).then(async () => {
            if (this.applies.common) {
                await this.applies.common(this.settings, changes, this.app)
            }
            this.applied()
            return this.settings
        })
    }
}
