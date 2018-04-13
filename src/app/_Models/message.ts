export interface Message {
    id: number;
    senderId: number;
    senderPhotoUrl: string;
    recipientId: number;
    recipientPhotoUrl: string;
    senderName: string;
    recipientName: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}