import {registerGlobalPropertyFactory} from '../helpers'
import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$cacheManager',
                    app => new CacheManager(app).extend(extend),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$cache',
                    app => app.$cacheManager.driver(),
                )
            },
        },
    }
}
