export interface TCrud {
    read: boolean,
    create: boolean,
    update: boolean,
    delete: boolean
}

export enum EAppFeatures {
    gallery = 'gallery',
    role = 'role',
    product = 'product',
    productDetails = 'productDetails',
    category = 'category',
    photo = 'photo',
    user = 'user'
}

export interface TPermission {
    feature: EAppFeatures,
    access: TCrud
}


export interface TRole {
    role: 'string',
    permissions: TPermission[]
}


export interface TUser {
    email: string,
    password: string,
    isActive: boolean,
    role: 'customer' | string,
    isDeleted: boolean,
    isVarified: boolean,
    isMasterAdmin?: boolean
}