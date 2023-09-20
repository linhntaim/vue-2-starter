import {Base64Encryptor} from './base64-encryptor'
import {Drivers} from '../drivers'

export class Encryption extends Drivers
{
    constructor(app) {
        super(app, 'encryption', 'base64')
    }

    createBase64() {
        return new Base64Encryptor(this.options('base64'))
    }
}
