import {registerGlobalPropertyFactory} from '../helpers'
import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$encryption',
                    app => new Encryption(app).extend(extend),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$encryptor',
                    app => app.$encryption.driver(),
                )
            },
        },
    }
}
