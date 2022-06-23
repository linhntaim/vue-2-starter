import {registerPropertyFactory} from '../helpers'
import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$storageManager', function (app) {
                    return new StorageManager(app).extend(extend)
                })
                registerPropertyFactory(vueApp, '$storage', function (app) {
                    return app.$storageManager.driver()
                })
                registerPropertyFactory(vueApp, '$cookie', function (app) {
                    return app.$storageManager.driver('cookie')
                })
            },
        },
    }
}
