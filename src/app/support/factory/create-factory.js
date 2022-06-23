import {registerPropertyFactory} from '../helpers'
import {Singleton} from './singleton'

export function createFactory() {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$singleton', function (app) {
                    return new Singleton(app)
                })
            },
        },
    }
}
