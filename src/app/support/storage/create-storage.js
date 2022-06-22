import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                const storageManager = new StorageManager(vueApp).extend(extend)
                vueApp.prototype.$storageManager = storageManager
                vueApp.prototype.$storage = storageManager.driver()
                vueApp.prototype.$cookie = storageManager.driver('cookie')
            },
        },
    }
}
