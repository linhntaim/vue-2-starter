import {Drivers} from '../drivers'
import axios from 'axios'

export class RequestManager extends Drivers
{
    constructor(app) {
        super(app, 'services.request', 'starter')
    }

    createStarter() {
        return axios.create(this.options('starter'))
    }
}
