import {AxiosError} from 'axios'
import {ServiceError} from './service-error'

export class StarterServiceError extends ServiceError
{
    parseError() {
        if (this.error instanceof AxiosError) {
            this.parseErrorResponse(this.error.response.data)
            || this.parseErrorCode(this.error.code)
            || this.parseErrorMessage(this.error.message)
        }
    }

    parseErrorResponse(data) {
        if (data?._messages) {
            this.messages = data._messages
            this.message = this.messages[0]
            this.data = data._data
            return true
        }
        return false
    }

    // eslint-disable-next-line no-unused-vars
    parseErrorCode(code) {
        return false
    }

    parseErrorMessage(message) {
        this.message = message
        this.messages = [message]
        this.data = null
        return true
    }
}
