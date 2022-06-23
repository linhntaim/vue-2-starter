import {StarterService} from '@/app/support/services'

export class AccountService extends StarterService
{
    current() {
        return this.get('account/current')
    }
}
