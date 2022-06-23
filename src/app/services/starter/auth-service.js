import {StarterService} from '@/app/support/services'

export class AuthService extends StarterService
{
    sanctumLogin(params) {
        return this.post('auth/sanctum/login', params)
    }

    sanctumLogout() {
        return this.post('auth/sanctum/logout')
    }

    register(params) {
        return this.post('auth/register', params)
    }

    forgotPassword(params) {
        return this.post('auth/forgot-password', params)
    }

    resetPassword(params) {
        return this.post('auth/reset-password', params)
    }
}
