export interface IMessage {
    /**
     * Notification's title
     */
    title: string;

    /**
     * Notification's subtitle
     */
    subtitle?: string;

    /**
     * Notification body
     */
    message: string;

    /**
     * Thread ID to group messages
     */
    threadId?: string;

    /**
     * Custom data payload, up to 2048 bytes
     */
    payload?: Record<string, any>;

    /**
     * URL to open on click
     */
    url?: string;
}
