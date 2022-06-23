import {StarterService} from '@/app/support/services'

export class PrerequisiteService extends StarterService
{
    require(names) {
        return this.get('prerequisite', {names})
    }
}
