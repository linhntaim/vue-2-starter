import {registerPropertyFactory} from '../helpers'
import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$request', function (app) {
                    return new RequestManager(app).extend(extend)
                })
                registerPropertyFactory(vueApp, '$service', function (app) {
                    return ServiceClass => app.$singleton.make(ServiceClass)
                })
            },
        },
    }
}
