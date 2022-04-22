

export interface Notification {
    id: number;
    content: string;
    sender: string;
    receivers: string;
    date: Date;
    templateId: number;
}