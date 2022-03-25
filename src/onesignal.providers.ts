import { OnesignalOptions } from './interfaces';
import { ONESIGNAL_OPTIONS } from './constants';
import { Provider } from '@nestjs/common';

export function createOnesignalProviders(options: OnesignalOptions): Provider[] {
    return [
        {
            provide: ONESIGNAL_OPTIONS,
            useValue: options,
        },
    ];
}
