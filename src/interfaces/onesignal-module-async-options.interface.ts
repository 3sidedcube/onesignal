/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import { OnesignalOptions } from './onesignal-options.interface';
import { OnesignalOptionsFactory } from './onesignal-options-factory.interface';

export interface OnesignalAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[]
    useExisting?: Type<OnesignalOptionsFactory>
    useClass?: Type<OnesignalOptionsFactory>
    useFactory?: (...args: any[]) => Promise<OnesignalOptions> | OnesignalOptions
}
