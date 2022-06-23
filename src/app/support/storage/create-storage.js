import {registerGlobalPropertyFactory} from '../helpers'
import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$storageManager',
                    app => new StorageManager(app).extend(extend),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$storage',
                    app => app.$storageManager.driver(),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$cookie',
                    app => app.$storageManager.driver('cookie'),
                )
            },
        },
    }
}
