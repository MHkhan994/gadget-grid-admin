'use client';

import { Textarea } from '@/components/ui/textarea';

import { TCategory, TProductCategory } from '@/interface/category';
import { TProductAttribute } from '@/interface/product.interface';
import { globalError } from '@/lib/utils';
import { useGetAllCategoriesQuery } from '@/redux/api/categories';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProduct } from '@/redux/reducers/products/productSlice';
import React, { useEffect } from 'react';

const AddSpecifications = () => {
    const {
        data: categoryData,
        error: cateoryError,
        // isLoading: categoryLoading,
    } = useGetAllCategoriesQuery(false);
    const { product } = useAppSelector((state) => state.products);
    const { attributes } = product;
    const dispatch = useAppDispatch();

    if (cateoryError) {
        globalError(cateoryError);
    }

    useEffect(() => {
        if (product.category.length !== 0) {
            const category: TCategory = categoryData?.data.find(
                (cat: TCategory) =>
                    cat._id === product.category.find((c) => c.main)?.id,
            );

            if (category) {
                const attributes = category.product_details_categories.map(
                    (item: TProductCategory) => {
                        const newAttr: TProductAttribute = {
                            name: item.name,
                            fields: {},
                        };
                        item.fields.forEach((field: string) => {
                            newAttr.fields[field] = '';
                        });
                        return newAttr;
                    },
                );
                dispatch(
                    updateProduct({ key: 'attributes', value: attributes }),
                );
            }
        } else {
            dispatch(updateProduct({ key: 'attributes', value: [] }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.category]);

    const handleChange = (attrName: string, key: string, value: string) => {
        const newAttributes = attributes?.map((attr) => {
            if (attr.name === attrName) {
                return {
                    ...attr,
                    fields: { ...attr.fields, [key]: value },
                };
            }
            return attr;
        });

        dispatch(updateProduct({ key: 'attributes', value: newAttributes }));
    };

    return (
        <div className='mt-10 flex flex-col gap-6'>
            {attributes && attributes.length !== 0 && (
                <div>
                    <label className='text-lg font-semibold text-black'>
                        Attributes *
                    </label>
                    <p className='pb-1 text-sm text-gray'>
                        Please fill up all the attribute informations
                    </p>
                    <div className=''>
                        {attributes?.map((attr: TProductAttribute) => (
                            <div key={attr?.name} className='mt-4'>
                                <h1 className='text-md font-semibold text-black'>
                                    {attr?.name} *
                                </h1>
                                {Object.entries(attr?.fields).map(
                                    (field: [string, string], i) => {
                                        const key = field ? field[0] : '';
                                        console.log(field);
                                        return (
                                            <div
                                                key={i}
                                                className='my-2 grid grid-cols-8 items-center gap-3 overflow-hidden rounded-md border border-border-color ps-3'
                                            >
                                                <label className='col-span-2 text-sm font-semibold text-gray'>
                                                    {key}
                                                </label>
                                                <Textarea
                                                    defaultValue={field[1]}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            attr.name,
                                                            key,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder={`Enter ${key}`}
                                                    className='col-span-6 h-10 max-h-28 min-h-10 rounded-none bg-background-foreground text-sm'
                                                />
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSpecifications;
