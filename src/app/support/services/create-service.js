import {registerGlobalPropertyFactory} from '../helpers'
import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$request',
                    app => new RequestManager(app).extend(extend),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$service',
                    app => ServiceClass => app.$singleton.make(ServiceClass),
                )
            },
        },
    }
}
