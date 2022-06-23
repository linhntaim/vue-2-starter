import {registerPropertyFactory} from '../helpers'
import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$logManager', function (app) {
                    return new LogManager(app).extend(extend)
                })
                registerPropertyFactory(Vue, '$log', function (app) {
                    return app.$logManager.driver()
                })
            },
        },
    }
}
