import {registerGlobalPropertyFactory} from '../helpers'
import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$url',
                    app => new UrlGenerator(app),
                )
            },
        },
    }
}
