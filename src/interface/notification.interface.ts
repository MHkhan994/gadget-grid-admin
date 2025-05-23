import { TAdminData } from './admin.interface';
import { TUser } from './auth.interface';

export type TNotification = {
    _id: string;
    userTo: TUser | string;
    userFrom: TAdminData;
    opened: boolean;
    notificationType:
        | 'gallery'
        | 'role'
        | 'product'
        | 'productDetails'
        | 'category'
        | 'photo'
        | 'user'
        | 'brand'
        | 'bulkUpload'
        | 'productFilter';
    text: string;
    source?: string;
    createdAt: string;
    updatedAt: string;
    actionType: 'update' | 'create' | 'delete';
};
