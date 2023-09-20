import {ConsoleLog} from './console-log'
import {Drivers} from '../drivers'

export class LogManager extends Drivers
{
    constructor(app) {
        super(app, 'log', 'console')
    }

    createConsole() {
        return new ConsoleLog(this.options('console'))
    }
}
