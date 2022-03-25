import { OnesignalOptions } from './onesignal-options.interface';

export interface OnesignalOptionsFactory {
    createOnesignalOptions(): Promise<OnesignalOptions> | OnesignalOptions
}
