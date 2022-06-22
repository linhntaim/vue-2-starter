import {Encryptor} from './encryptor'
import {EncryptService} from '../services'

export class StarterEncryptor extends Encryptor
{
    constructor(app, options = {}) {
        super(options)

        this.app = app
    }

    async encrypt(data) {
        const response = await this.app.prototype.$service(EncryptService).encrypt(data)
        return response.encrypted
    }

    async decrypt(data) {
        const response = await this.app.prototype.$service(EncryptService).decrypt(data)
        return response.decrypted
    }
}
