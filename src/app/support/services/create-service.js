import {RequestManager} from './request-manager'
import {Singleton} from '../singleton'

export function createService(extend = {}) {
    return {
        installer: {
            install(vueApp) {
                const singleton = new Singleton(vueApp)
                vueApp.prototype.$request = new RequestManager(vueApp).extend(extend)
                vueApp.prototype.$service = ServiceClass => singleton.make(ServiceClass)
            },
        },
    }
}
