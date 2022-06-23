import {registerPropertyFactory} from '../helpers'
import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$logManager', function (app) {
                    return new LogManager(app).extend(extend)
                })
                registerPropertyFactory(vueApp, '$log', function (app) {
                    return app.$logManager.driver()
                })
            },
        },
    }
}
