import {registerGlobalPropertyFactory} from '../helpers'
import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$request', function (app) {
                    return new RequestManager(app).extend(extend)
                })
                registerGlobalPropertyFactory(Vue, '$service', function (app) {
                    return ServiceClass => app.$singleton.make(ServiceClass)
                })
            },
        },
    }
}
