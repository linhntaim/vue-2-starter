import {registerPropertyFactory} from '../helpers'
import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$url', function (app) {
                    return new UrlGenerator(app)
                })
            },
        },
    }
}
