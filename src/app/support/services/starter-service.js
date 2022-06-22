import {Service} from './service'
import {take} from '../helpers'
import {AxiosError} from 'axios'
import {StarterServiceError} from './starter-service-error'
import {ServiceError} from '@/app/support/services/service-error'

/**
 * @property {AxiosInstance} request
 */
export class StarterService extends Service
{
    constructor(app) {
        super(app)

        this.doneCallback = null
        this.errorCallback = null
        this.wrapErrorCallback = null
        this.alwaysCallback = null
    }

    requestDriver() {
        return 'starter'
    }

    done(callback) {
        this.doneCallback = callback
        return this
    }

    error(callback) {
        this.errorCallback = callback
        return this
    }

    always(callback) {
        this.alwaysCallback = callback
        return this
    }

    wrapError(callback) {
        this.wrapErrorCallback = callback
        return this
    }

    responseThen(requested, doneCallback = null, errorCallback = null, alwaysCallback = null, wrapErrorCallback = null) {
        return requested
            .then(response => {
                if (!response.data._status) {
                    throw response
                }
                const data = response.data._data
                doneCallback && doneCallback(data)
                return data
            })
            .catch(error => {
                if (!(error instanceof AxiosError)) {
                    error = new AxiosError('Server Error', 'ERR_SERVER', error.config, error.request, error)
                }
                error = wrapErrorCallback ? wrapErrorCallback(error) : new StarterServiceError(error)
                errorCallback && errorCallback(error)
                return error
            })
            .then(response => {
                alwaysCallback && alwaysCallback(response)
                if (response instanceof ServiceError) {
                    throw response
                }
                return response
            })
    }

    response(requested) {
        return take(
            this.responseThen(
                requested,
                this.doneCallback,
                this.errorCallback,
                this.alwaysCallback,
                this.wrapErrorCallback,
            ),
            () => {
                this.doneCallback = null
                this.errorCallback = null
                this.alwaysCallback = null
                this.wrapErrorCallback = null
            },
        )
    }

    get(url, params = {}) {
        return this.response(
            this.requester().get(url, {
                params,
            }),
        )
    }

    post(url, params = {}) {
        return this.response(
            this.requester().post(url, params),
        )
    }

    delete(url, params = {}) {
        return this.response(
            this.requester().delete(url, {data: params}),
        )
    }
}
