import { combineSlices } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import authSlice from './auth/authSlice';
import generalSlice from './general/generalReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import localforage from 'localforage';
import { baseApi } from '../api/baseApi';

let instance;
try {
  instance = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: 'gadget_grid_admin',
  });
} catch (error) {
  console.log(error);
}

const authPersistConfig = {
  key: 'auth',
  storage: instance || storage,
};

const productPersistConfig = {
  key: 'general',
  storage: instance || storage,
};

const rootReducer = combineSlices({
  [baseApi.reducerPath]: baseApi.reducer,
  products: persistReducer(productPersistConfig, productReducer),
  auth: persistReducer(authPersistConfig, authSlice),
  general: generalSlice,
});

export default rootReducer;