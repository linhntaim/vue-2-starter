import {registerGlobalPropertyFactory} from '../helpers'
import {Singleton} from './singleton'

export function createFactory() {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$singleton',
                    app => new Singleton(app),
                )
            },
        },
    }
}
