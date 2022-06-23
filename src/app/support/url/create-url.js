import {registerPropertyFactory} from '../helpers'
import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$url', function (app) {
                    return new UrlGenerator(app)
                })
            },
        },
    }
}
