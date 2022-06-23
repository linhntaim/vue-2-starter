import {registerGlobalPropertyFactory} from '../helpers'
import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$storageManager', function (app) {
                    return new StorageManager(app).extend(extend)
                })
                registerGlobalPropertyFactory(Vue, '$storage', function (app) {
                    return app.$storageManager.driver()
                })
                registerGlobalPropertyFactory(Vue, '$cookie', function (app) {
                    return app.$storageManager.driver('cookie')
                })
            },
        },
    }
}
