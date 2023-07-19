import {registerGlobalPropertyFactory} from '@/app/support/helpers'
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