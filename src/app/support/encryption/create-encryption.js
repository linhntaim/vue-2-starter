import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                const encryption = new Encryption(vueApp).extend(extend)
                vueApp.prototype.$encryption = encryption
                vueApp.prototype.$encryptor = encryption.driver()
            },
        },
    }
}
