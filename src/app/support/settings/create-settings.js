import {registerGlobalPropertyFactory} from '../helpers'
import {Settings} from './settings'

export function createSettings(options = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$settings',
                    app => new Settings(app, options),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$setLocale',
                    app => locale => {
                        app.$log.debug('locale', 'applying', locale)
                        return app.$settings.setLocale(locale).apply()
                    },
                )
            },
        },
    }
}
