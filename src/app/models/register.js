import {app} from '@/bootstrap/app'
import {AuthService} from '@/app/services/starter/auth-service'

export const register = {
    namespaced: true,
    state: () => ({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',

        progressing: false,
    }),
    mutations: {
        setProgressing(state, progressing) {
            state.progressing = progressing
        },
        reset(state) {
            state.name = ''
            state.email = ''
            state.password = ''
            state.passwordConfirmation = ''
        },
    },
    actions: {
        register(context, params = {}) {
            return app.$service(AuthService).register(Object.assign({
                name: context.state.name,
                email: context.state.email,
                password: context.state.password,
                password_confirmation: context.state.passwordConfirmation,
            }, params))
        },
    },
    getters: {
        progressing: state => state.progressing,
    },
}
