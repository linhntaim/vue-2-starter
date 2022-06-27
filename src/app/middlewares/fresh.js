import {localization} from '@/config'
import {Middleware} from '@/app/support/router'
import {ServiceError} from '@/app/support/services'

export class Fresh extends Middleware
{
    async beforeEach(to, from, next) {
        const fresh = this.app.$start.isFresh()
        this.app.$start.continue()
        if (fresh) {
            if (!(await this.restoreFromServer(to, from, next))) {
                return
            }
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        next()
    }

    async restoreFromServer(to, from, next) {
        const data = await this.app.$store.dispatch('prerequisite/require', ['server']).catch(err => err)
        this.app.$log.debug('middleware', 'fresh.restoreFromServer', data)
        if (data instanceof ServiceError) {
            this.app.$start.reset()
            const connectionLostRoute = this.app.$config.app.routes.connection_lost
            if (to.name !== connectionLostRoute.name) {
                next(connectionLostRoute)
                return false
            }
        }
        return true
    }

    async restoreFromCache() {
        this.app.$log.debug('middleware', 'fresh.restoreFromCache')
        //
    }

    async restoreFromCookie() {
        this.app.$log.debug('middleware', 'fresh.restoreFromCookie')
        // settings
        await this.app.$settings
            .set(await this.app.$cookie.get('settings', {
                locale: localization.locale.default,
            }))
            .apply()
        // account
        await this.app.$store.dispatch('account/restoreFromCookie')
    }
}
