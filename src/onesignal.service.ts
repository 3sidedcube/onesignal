// tslint:disable: variable-name
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Client as OnesignalClient } from 'onesignal-node';
import { ONESIGNAL_OPTIONS } from './constants';
import { OnesignalOptions } from './interfaces';
import { IMessage } from './interfaces/message.interface';

interface IOnesignalService {
    send(to: string[], payload: IMessage): Promise<any>;
}

@Injectable()
export class OnesignalService implements IOnesignalService {
    private readonly logger: Logger;

    private client: OnesignalClient;

    constructor(@Inject(ONESIGNAL_OPTIONS) private _OnesignalOptions: OnesignalOptions) {
        this.logger = new Logger(OnesignalService.name);

        this.client = new OnesignalClient(_OnesignalOptions.appId, _OnesignalOptions.apiKey);
    }

    async send(to: string[], payload: IMessage): Promise<any> {
        this.client.createNotification({
            include_external_user_ids: to,
            channel_for_external_user_ids: 'push',
            thread_id: payload.threadId,
            android_group: payload.threadId,
            ios_badgeCount: 1,
            ios_badgeType: 'Increase',
            headings: {
                en: payload.title,
            },
            subtitle: {
                en: payload.subtitle,
            },
            contents: {
                en: payload.message,
            },
            url: payload.url,
            data: payload.payload,
        });
    }
}
