import {registerPropertyFactory} from '../helpers'
import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$encryption', function (app) {
                    return new Encryption(app).extend(extend)
                })
                registerPropertyFactory(vueApp, '$encryptor', function (app) {
                    return app.$encryption.driver()
                })
            },
        },
    }
}
