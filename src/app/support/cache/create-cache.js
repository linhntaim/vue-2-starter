import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                const cacheManager = new CacheManager(vueApp).extend(extend)
                vueApp.prototype.$cacheManager = cacheManager
                vueApp.prototype.$cache = cacheManager.driver()
            },
        },
    }
}
