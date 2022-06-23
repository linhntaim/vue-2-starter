import {registerGlobalPropertyFactory} from '../helpers'
import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$logManager',
                    app => new LogManager(app).extend(extend),
                )
                registerGlobalPropertyFactory(
                    Vue,
                    '$log',
                    app => app.$logManager.driver(),
                )
            },
        },
    }
}
