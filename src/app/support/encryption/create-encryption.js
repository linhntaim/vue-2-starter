import {registerPropertyFactory} from '../helpers'
import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$encryption', function (app) {
                    return new Encryption(app).extend(extend)
                })
                registerPropertyFactory(Vue, '$encryptor', function (app) {
                    return app.$encryption.driver()
                })
            },
        },
    }
}
