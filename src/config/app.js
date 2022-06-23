import {trim} from 'locutus/php/strings'

export const app = {
    id: process.env.VUE_APP_ID || 'starter',
    name: process.env.VUE_APP_NAME || 'Starter',
    url: window.location.origin + trim(process.env.BASE_URL, '/'),
    static: !('VUE_APP_SERVICE_URL' in process.env),

    routes: {
        root: {
            name: 'root',
        },
        connection_lost: {
            name: 'connection_lost',
        },
        redirect_if_unauthenticated: {
            name: 'unauthenticated',
        },
        redirect_if_authenticated: {
            name: 'root',
        },
    },
}
