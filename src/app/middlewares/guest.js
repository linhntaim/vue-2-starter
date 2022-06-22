import {app} from '@/bootstrap/app'
import {Middleware} from '@/app/support/router'

export class Guest extends Middleware
{
    beforeEach(to, from, next) {
        app.$log.debug('middleware', 'auth.beforeEach')
        if (app.$store.getters['account/isLoggedIn']) {
            if (to.matched.some(route => route.meta.requiresGuest)) {
                const ifAuthenticatedRoute = app.$config.app.routes.redirect_if_authenticated
                if (to.name !== ifAuthenticatedRoute.name) {
                    next(ifAuthenticatedRoute)
                    return false
                }
            }
        }
        next()
    }
}
