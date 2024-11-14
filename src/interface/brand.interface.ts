import { TUser } from './auth.interface';

export type TBrand = {
  _id: string;
  name: string;
  image: string;
  isDeleted: boolean;
  isActive: boolean;
  createdBy: Partial<TUser>;
};
