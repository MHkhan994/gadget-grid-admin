import {
    TCategory,
    TCreateCategory,
    TUpdateCategory,
} from '@/interface/category';
import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';
import { socket } from '@/lib/socket';
import { TSocketResponse } from '@/interface/common';
import { TResponse } from '@/interface/common.interface';

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query<TResponse<TCategory[]>, undefined>({
            query: () => {
                return {
                    url: `/category/get-all`,
                    method: 'GET',
                };
            },

            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                try {
                    await cacheDataLoaded;

                    socket?.on(
                        'category',
                        (data: TSocketResponse<TCategory>) => {
                            console.log(data);
                        },
                    );
                } catch (err) {
                    console.log(err);
                }
            },

            keepUnusedDataFor: 320,
            providesTags: [tagTypes.categories],
        }),

        createCategory: build.mutation({
            query: (payload: TCreateCategory) => {
                return {
                    url: '/category/create',
                    method: 'POST',
                    data: payload,
                };
            },

            invalidatesTags: [tagTypes.categories],
        }),

        deleteCategory: build.mutation({
            query: (id: string) => {
                return {
                    url: `/category/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: [tagTypes.categories],
        }),

        updateCategory: build.mutation({
            query: ({
                id,
                payload,
            }: {
                id: string;
                payload: TUpdateCategory;
            }) => {
                return {
                    url: `/category/${id}`,
                    method: 'PATCH',
                    data: payload,
                };
            },
            invalidatesTags: [tagTypes.categories],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesApi;
