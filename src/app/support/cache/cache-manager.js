import {Drivers} from '../drivers'
import {StorageCache} from './storage-cache'

export class CacheManager extends Drivers
{
    constructor(app) {
        super(app, 'cache', 'storage')
    }

    storage(storageDriver) {
        return storageDriver
            ? this.app.prototype.$storageManager.driver(storageDriver)
            : this.app.prototype.$storage
    }

    createStorage() {
        const options = this.options('storage')
        return new StorageCache(this.storage(options.storage), options)
    }
}
