import {app} from '@/bootstrap/app'
import {AuthService} from '@/app/services/starter/auth-service'
import {AccountService} from '@/app/services/starter/account-service'

export const account = {
    namespaced: true,
    state: () => ({
        account: null,
        token: {
            type: null,
            accessToken: null,
            expiredAt: null,
        },
    }),
    mutations: {
        setToken(state, {type, accessToken, expiredAt}) {
            state.token.type = type
            state.token.accessToken = accessToken
            state.token.expiredAt = expiredAt

            app.$request.with('starter', axios => {
                if (type === 'bearer' && accessToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                }
                return axios
            }, 'header.authorization')
        },
        setTokenCookie(state) {
            app.$cookie.put('model.account.token', {
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
        unset(state) {
            state.token = {
                type: null,
                accessToken: null,
                expiredAt: null,
            }
            state.account = null

            app.$request.with('starter', axios => {
                delete axios.defaults.headers.common['Authorization']
                return axios
            }, 'header.authorization')
            app.$cookie.remove('model.account.token')
        },
    },
    actions: {
        async restoreFromCookie(context) {
            const token = await app.$cookie.get('model.account.token')
            app.$log.debug('model', 'account.restoreFromCookie', token)
            if (token && token.type && token.accessToken) {
                context.commit('setToken', {
                    type: token.type,
                    accessToken: token.accessToken,
                    expiredAt: token.expiredAt,
                })
                await context.dispatch('current').catch(err => app.$log.debug('model', 'cannot retrieve user', err))
            }
            if (!context.getters.isLoggedIn) {
                context.commit('unset')
            }
            return token
        },
        current(context) {
            return app.$service(AccountService)
                .done(data => context.commit('setAccount', data.model))
                .current()
        },
        sanctumLogin(context, params) {
            return app.$service(AuthService)
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
            return app.$service(AuthService)
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
    },
}
