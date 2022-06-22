import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                const logManager = new LogManager(vueApp).extend(extend)
                vueApp.prototype.$logManager = logManager
                vueApp.prototype.$log = logManager.driver()
            },
        },
    }
}
