import {registerGlobalPropertyFactory} from '../helpers'
import {Singleton} from './singleton'

export function createFactory() {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$singleton', function (app) {
                    return new Singleton(app)
                })
            },
        },
    }
}
