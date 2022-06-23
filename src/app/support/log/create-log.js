import {registerGlobalPropertyFactory} from '../helpers'
import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$logManager', function (app) {
                    return new LogManager(app).extend(extend)
                })
                registerGlobalPropertyFactory(Vue, '$log', function (app) {
                    return app.$logManager.driver()
                })
            },
        },
    }
}