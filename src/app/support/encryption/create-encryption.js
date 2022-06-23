import {registerGlobalPropertyFactory} from '../helpers'
import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$encryption', function (app) {
                    return new Encryption(app).extend(extend)
                })
                registerGlobalPropertyFactory(Vue, '$encryptor', function (app) {
                    return app.$encryption.driver()
                })
            },
        },
    }
}
