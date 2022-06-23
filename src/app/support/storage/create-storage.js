import {registerPropertyFactory} from '../helpers'
import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$storageManager', function (app) {
                    return new StorageManager(app).extend(extend)
                })
                registerPropertyFactory(Vue, '$storage', function (app) {
                    return app.$storageManager.driver()
                })
                registerPropertyFactory(Vue, '$cookie', function (app) {
                    return app.$storageManager.driver('cookie')
                })
            },
        },
    }
}
