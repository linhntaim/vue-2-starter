import {app} from '@/bootstrap/app'
import {AuthService} from '@/app/services/starter/auth-service'

export const forgotPassword = {
    namespaced: true,
    state: () => ({
        email: '',

        progressing: false,
    }),
    mutations: {
        setProgressing(state, progressing) {
            state.progressing = progressing
        },
        reset(state) {
            state.email = ''
        },
    },
    actions: {
        forgotPassword(context, params = {}) {
            return app.$service(AuthService).forgotPassword(Object.assign({
                email: context.state.email,
            }, params))
        },
    },
    getters: {
        progressing: state => state.progressing,
    },
}
