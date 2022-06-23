import {registerPropertyFactory} from '../helpers'
import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$cacheManager', function(app)  {
                    return new CacheManager(app).extend(extend)
                })
                registerPropertyFactory(Vue, '$cache', function(app)  {
                    return app.$cacheManager.driver()
                })
            },
        },
    }
}
