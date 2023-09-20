import {registerGlobalPropertyFactory} from '../helpers'
import {Timer} from './timer'

export function createTimer() {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$timer',
                    () => new Timer(),
                )
            },
        },
    }
}
