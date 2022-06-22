import {Drivers} from '../drivers'
import {StarterEncryptor} from './starter-encryptor'
import {Base64Encryptor} from './base64-encryptor'

export class Encryption extends Drivers
{
    constructor(app) {
        super(app, 'encryption', 'base64')
    }

    createBase64() {
        return new Base64Encryptor(this.options('base64'))
    }

    createStarter() {
        return new StarterEncryptor(this.app, this.options('starter'))
    }
}
