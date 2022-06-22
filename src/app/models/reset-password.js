import {app} from '@/bootstrap/app'
import {AuthService} from '@/app/services/starter/auth-service'

export const resetPassword = {
    namespaced: true,
    state: () => ({
        token: '',
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
            state.token = ''
            state.email = ''
            state.password = ''
            state.passwordConfirmation = ''
        },
    },
    actions: {
        resetPassword(context) {
            return app.$service(AuthService).resetPassword({
                token: context.state.token,
                email: context.state.email,
                password: context.state.password,
                password_confirmation: context.state.passwordConfirmation,
            })
        },
    },
    getters: {
        progressing: state => state.progressing,
    },
}
