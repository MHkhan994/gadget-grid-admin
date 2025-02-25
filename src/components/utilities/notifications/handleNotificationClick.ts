import { TNotification } from '@/interface/notification.interface';
import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/api/tagTypes';
import { store } from '@/redux/store';

// const findTag = (noti: TNotification) => {
//     switch (noti.notificationType) {
//         case 'brand':
//             if(noti.actionType === 'create');
//         case 'bulkUpload':
//             return tagTypes.bulkUpload;
//         case 'category':
//             return tagTypes.categories;
//         case 'gallery':
//             return tagTypes.galleryFolder;
//         case 'photo':
//             return tagTypes.upload;
//         case 'product':
//             return tagTypes.product;
//         case 'productDetails':
//             return tagTypes.detailsCategory;
//         case 'productFilter':
//             return tagTypes.productFilter;
//         case 'role':
//             return tagTypes.roles;
//         default:
//             return undefined;
//     }
// };

export const handleNotificationClick = (
    noti: TNotification,
    gotToRoute: (_: string) => void,
) => {
    const { user } = store.getState().auth;
    console.log(noti);
    if (noti?.notificationType === 'category') {
        gotToRoute('/category');
    }

    if (noti?.notificationType === 'product') {
        if (noti?.actionType === 'create') {
            gotToRoute(`/product/update-product/${noti?.source}`);
        } else if (noti?.actionType === 'update') {
            gotToRoute(`/product/update-product/${noti?.source}`);
        }
    }

    if (noti?.notificationType === 'brand') {
        gotToRoute('/product/brands');
    }
};
