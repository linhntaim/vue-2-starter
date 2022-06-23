import {registerPropertyFactory} from '../helpers'
import {Singleton} from './singleton'

export function createFactory() {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$singleton', function (app) {
                    return new Singleton(app)
                })
            },
        },
    }
}
