import {registerPropertyFactory} from '../helpers'
import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$request', function (app) {
                    return new RequestManager(app).extend(extend)
                })
                registerPropertyFactory(Vue, '$service', function (app) {
                    return ServiceClass => app.$singleton.make(ServiceClass)
                })
            },
        },
    }
}
