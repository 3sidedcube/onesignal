// tslint:disable: variable-name
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ONESIGNAL_OPTIONS } from './constants';
import { OnesignalOptions } from './interfaces';

/**
 * Sample interface for OnesignalService
 *
 * Customize this as needed to describe the OnesignalService
 *
 */
interface IOnesignalService {
    test(): Promise<any>
}

@Injectable()
/**
 *  You can remove the dependencies on the Logger if you don't need it.  You can also
 *  remove the `async test()` method.
 *
 *  The only thing you need to leave intact is the `@Inject(ONESIGNAL_OPTIONS) private _onesignalOptions`.
 *
 *  That injected dependency gives you access to the options passed in to
 *  OnesignalService.
 *
 */
export class OnesignalService implements IOnesignalService {
    private readonly logger: Logger
    constructor(
        @Inject(ONESIGNAL_OPTIONS) private _OnesignalOptions: OnesignalOptions,
    ) {
        this.logger = new Logger('OnesignalService');
        this.logger.log(`Options: ${JSON.stringify(this._OnesignalOptions)}`);
    }

    async test(): Promise<any> {
        return 'Hello from OnesignalModule!';
    }
}
