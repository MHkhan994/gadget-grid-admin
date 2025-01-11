import { TCreateProductFilter } from '@/redux/api/filtersApi';
import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type TProps = {
    setUpdateFilter: Dispatch<SetStateAction<TCreateProductFilter | null>>;
    setDeleteOpen: Dispatch<SetStateAction<TCreateProductFilter | null>>;
    data: TCreateProductFilter[];
};

const ProductFilterCard = ({
    data,
    setUpdateFilter,
    setDeleteOpen,
}: TProps) => {
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data?.map((filter: TCreateProductFilter) => (
                <div
                    className='z-0 flex h-full flex-col rounded-md border border-border-color bg-light-gray p-4 transition-all hover:scale-[1.01] hover:shadow-md'
                    key={filter._id}
                >
                    <h3 className='text-lg font-semibold text-black'>
                        {filter.title}
                    </h3>
                    <div className='flex flex-grow flex-col gap-2 pt-3'>
                        {filter.options?.map((field) => (
                            <div
                                className='rounded-[5px] bg-white px-3 py-[6px] text-gray'
                                key={field}
                            >
                                {field}
                            </div>
                        ))}
                    </div>

                    <div className='mt-3 flex w-full gap-3'>
                        <Button
                            onClick={() => {
                                setUpdateFilter(filter);
                            }}
                            variant={'edit_button'}
                            size={'base'}
                        ></Button>

                        <Button
                            variant={'delete_button'}
                            size={'base'}
                            onClick={() => {
                                setDeleteOpen(filter);
                            }}
                        ></Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductFilterCard;
