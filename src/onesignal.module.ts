import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { OnesignalService } from './onesignal.service';
import { ONESIGNAL_OPTIONS } from './constants';
import {
    OnesignalOptions,
    OnesignalAsyncOptions,
    OnesignalOptionsFactory,
} from './interfaces';
import { createOnesignalProviders } from './onesignal.providers';

@Global()
@Module({
    providers: [OnesignalService],
    exports: [OnesignalService],
})
export class OnesignalModule {
    /**
     * Registers a configured Onesignal Module for import into the current module
     */
    public static register(options: OnesignalOptions): DynamicModule {
        return {
            module: OnesignalModule,
            providers: createOnesignalProviders(options),
        };
    }

    /**
     * Registers a configured Onesignal Module for import into the current module
     * using dynamic options (factory, etc)
     */
    public static registerAsync(options: OnesignalAsyncOptions): DynamicModule {
        return {
            module: OnesignalModule,
            providers: [...this.createProviders(options)],
        };
    }

    private static createProviders(options: OnesignalAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createOptionsProvider(options)];
        }

        return [
            this.createOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }

    private static createOptionsProvider(
        options: OnesignalAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: ONESIGNAL_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        // For useExisting...
        return {
            provide: ONESIGNAL_OPTIONS,
            useFactory: async (optionsFactory: OnesignalOptionsFactory) =>
                await optionsFactory.createOnesignalOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
}
