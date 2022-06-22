import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        installer: {
            install(app) {
                app.prototype.$url = new UrlGenerator(app)
            },
        },
    }
}
