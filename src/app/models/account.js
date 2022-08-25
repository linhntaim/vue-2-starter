import {AccountService} from '@/app/services/starter/account-service'
import {AuthService} from '@/app/services/starter/auth-service'

export const account = {
    namespaced: true,
    state: () => ({
        account: null,
        token: {
            type: null,
            accessToken: null,
            expiredAt: null,
        },
        logoutActivated: false,
    }),
    mutations: {
        setToken(state, {type, accessToken, expiredAt}) {
            state.token.type = type
            state.token.accessToken = accessToken
            state.token.expiredAt = expiredAt

            this.app.$request.mod('starter', axios => {
                if (type === 'bearer' && accessToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                }
                return axios
            })
        },
        setTokenCookie(state) {
            this.app.$cookie.put('model.account.token', {
                type: state.token.type,
                accessToken: state.token.accessToken,
                expiredAt: state.token.expiredAt,
            }, state.token.expiredAt ? {
                expired: state.token.expiredAt * 1000,
            } : {})
        },
        setAccount(state, account) {
            state.account = account
        },
        activateLogout(state) {
            state.logoutActivated = true
        },
        unset(state) {
            state.token = {
                type: null,
                accessToken: null,
                expiredAt: null,
            }
            state.account = null

            this.app.$request.mod('starter', axios => {
                delete axios.defaults.headers.common['Authorization']
                return axios
            })
            this.app.$cookie.remove('model.account.token')
        },
    },
    actions: {
        async restoreFromCookie(context) {
            const token = await this.app.$cookie.get('model.account.token')
            this.app.$log.debug('model', 'account.restoreFromCookie', token)
            if (token && token.type && token.accessToken) {
                context.commit('setToken', {
                    type: token.type,
                    accessToken: token.accessToken,
                    expiredAt: token.expiredAt,
                })
                await context.dispatch('current').catch(err => this.app.$log.debug('model', 'cannot retrieve user', err))
            }
            if (!context.getters.isLoggedIn) {
                context.commit('unset')
            }
            return token
        },
        current(context) {
            return this.app.$service(AccountService)
                .done(data => context.commit('setAccount', data.model))
                .current()
        },
        sanctumLogin(context, params) {
            return this.app.$service(AuthService)
                .done(data => {
                    context.commit('setToken', {
                        type: 'bearer',
                        accessToken: data.token.access_token,
                        expiredAt: data.token.expired_at,
                    })
                    context.commit('setTokenCookie')
                    context.commit('setAccount', data.model)
                })
                .sanctumLogin(params)
        },
        sanctumLogout(context) {
            return this.app.$service(AuthService)
                .sanctumLogout()
                .then(data => {
                    context.commit('unset')
                    return data
                })
        },
    },
    getters: {
        account: state => state.account,
        isLoggedIn: state => state.account != null,
        logoutActivated: state => state.logoutActivated,
    },
}
