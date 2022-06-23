import {registerGlobalPropertyFactory} from '../helpers'
import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$cacheManager', function(app)  {
                    return new CacheManager(app).extend(extend)
                })
                registerGlobalPropertyFactory(Vue, '$cache', function(app)  {
                    return app.$cacheManager.driver()
                })
            },
        },
    }
}
