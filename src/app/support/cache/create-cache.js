import {registerPropertyFactory} from '../helpers'
import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$cacheManager', function(app)  {
                    return new CacheManager(app).extend(extend)
                })
                registerPropertyFactory(vueApp, '$cache', function(app)  {
                    return app.$cacheManager.driver()
                })
            },
        },
    }
}
