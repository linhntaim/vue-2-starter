import {StarterService} from '../starter-service'

export class EncryptService extends StarterService
{
    encrypt(data) {
        return this.post('encrypt', {data})
    }

    decrypt(data) {
        return this.post('decrypt', {data})
    }
}
