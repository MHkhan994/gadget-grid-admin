'use client';
import { TSelectOptions } from '@/components/categories/interface';
import CustomAvatar from '@/components/custom/CustomAvatar';
import { DataTable } from '@/components/custom/DataTable';
import EllipsisText from '@/components/custom/EllipsisText';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import Select from '@/components/ui/select';
import useDebounce from '@/hooks/useDebounce';
import { TAdminData } from '@/interface/admin.interface';
import { TBrand } from '@/interface/brand.interface';
import { TCategory } from '@/interface/category';
import { TProduct, TProductWarrenty } from '@/interface/product.interface';
import { useGetAllBrandsQuery } from '@/redux/api/brandApi';
import { useGetAllCategoriesQuery } from '@/redux/api/categories';
import { useGetAllProductsQuery } from '@/redux/api/productApi';
import { useGetAllAdminsQuery } from '@/redux/api/usersApi';
import { ColumnDef } from '@tanstack/react-table';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import PageHeader from '@/components/common/PageHeader';
import ColumnSettings from '@/components/shared/ColumnSettings';
import AllProductsGridView from '@/components/product/all-product/AllProductsGridView';
import ProductSkeleton from '@/components/product/all-product/ProductSkeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setViewMode } from '@/redux/reducers/products/productSlice';
import UserCard from '@/components/common/UserCard';
import { Grid3X3, Sheet } from 'lucide-react';

const AllProducts = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [createdBy, setCreatedBy] = useState('');
    const [brand, setBrand] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [createdAt, setCreateAt] = useState<Dayjs | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm);
    const {
        data: productData,
        error,
        isFetching,
    } = useGetAllProductsQuery(
        {
            page,
            limit,
            searchTerm: debouncedSearchTerm,
            ...(createdAt ? { createdAt: createdAt.toISOString() } : {}),
            ...(createdBy ? { createdBy } : {}),
            ...(brand ? { brand } : {}),
            ...(category ? { category } : {}),
        },
        {
            pollingInterval: 300000,
        },
    );
    const { data: adminData } = useGetAllAdminsQuery(undefined);
    const { data: brandData } = useGetAllBrandsQuery(undefined);
    const { data: categoryData } = useGetAllCategoriesQuery(undefined);

    const paginationData = productData?.pagination;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { viewMode } = useAppSelector((s) => s.products);

    const columns: ColumnDef<TProduct>[] = [
        {
            accessorKey: '_id',
            header: 'Serial',
            cell: ({ row }) => {
                return <p>{row.index + 1}</p>;
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                return (
                    <div>
                        <EllipsisText
                            className='text-gray'
                            text={row.getValue('name')}
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: 'mainCategory',
            header: 'Category',
            cell: ({ row }) => {
                const category: TCategory = row.getValue('mainCategory');
                return (
                    <EllipsisText
                        width={120}
                        className='text-gray'
                        text={category?.name}
                    />
                );
            },
        },
        {
            accessorKey: 'brand',
            header: 'Brand',
            cell: ({ row }) => {
                const brand: TBrand = row.getValue('brand');
                return (
                    <div className='flex items-center gap-1'>
                        <CustomAvatar src={brand.image} />
                        <EllipsisText
                            width={60}
                            className='text-gray'
                            text={brand.name}
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ row }) => {
                const createdAt = row.getValue('createdAt');
                return (
                    <div className='min-w-24'>
                        {dayjs(createdAt as string).format('DD MMM, YYYY')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'updatedAt',
            header: 'Updated At',
            cell: ({ row }) => {
                const createdAt = row.getValue('createdAt') as string;
                const updatedAt = row.getValue('updatedAt') as string;
                const isSame = createdAt === updatedAt;
                return (
                    <div className='min-w-24'>
                        {!isSame ? (
                            dayjs(createdAt as string).format('DD MMM, YYYY')
                        ) : (
                            <span className='text-red-orange'>Not updated</span>
                        )}
                    </div>
                );
            },
        },

        // {
        //     accessorKey: 'model',
        //     header: 'Model',
        //     cell: ({ row }) => {
        //         return <EllipsisText width={70} text={row.getValue('model')} />;
        //     },
        // },

        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => {
                return <div className=''>${row.getValue('price')}</div>;
            },
        },
        {
            accessorKey: 'quantity',
            header: 'Stock',
            cell: ({ row }) => {
                return <div className=''>{row.getValue('quantity')}</div>;
            },
        },
        {
            accessorKey: 'warranty',
            header: 'Warranty',
            cell: ({ row }) => {
                const warranty: TProductWarrenty = row.getValue('warranty');
                return (
                    <div>
                        <p className='text-gray'>
                            {warranty?.lifetime
                                ? 'Lifetime'
                                : `${warranty?.days} days`}
                        </p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'createdBy',
            header: 'CreatedBy',
            cell: ({ row }) => {
                const createdBy: string = row.getValue('createdBy');
                return <UserCard size='sm' id={createdBy} />;
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const _id = row.getValue('_id');
                return (
                    <div className='flex gap-2'>
                        <Button variant={'view_button'} size={'base'} />
                        <Button
                            onClick={() =>
                                router.push(`/product/update-product/${_id}`)
                            }
                            variant={'edit_button'}
                            size={'base'}
                        />
                        <Button variant={'delete_button'} size={'base'} />
                    </div>
                );
            },
        },
    ];

    const adminSelectData: TSelectOptions[] = adminData?.data?.map(
        (admin: TAdminData) => ({
            label: admin?.fullName,
            value: admin?.user?._id,
        }),
    );
    const brandSelectData: TSelectOptions[] = brandData?.data?.map(
        (brand: TBrand) => ({
            label: brand?.name,
            value: brand?._id,
        }),
    );
    const categorySelectData: TSelectOptions[] =
        categoryData?.data?.map((category: TCategory) => ({
            label: category?.name,
            value: category?._id,
        })) || [];

    const handlePageChange = (page: number, limit: number) => {
        setPage(page);
        setLimit(limit);
    };

    return (
        <div>
            <PageHeader
                title={'All Products'}
                subtitle='Manage and Organize All Products in Your Inventory'
                buttons={
                    <>
                        <Button
                            onClick={() =>
                                router.push('/product/create-product')
                            }
                            variant={'default'}
                        >
                            Create new product
                        </Button>
                        <Button
                            tooltip='Grid view'
                            variant={
                                viewMode === 'grid' ? 'default' : 'secondary'
                            }
                            size={'icon'}
                            onClick={() => dispatch(setViewMode('grid'))}
                        >
                            <Grid3X3 />
                        </Button>
                        <Button
                            tooltip='Table view'
                            variant={
                                viewMode === 'table' ? 'default' : 'secondary'
                            }
                            size={'icon'}
                            onClick={() => dispatch(setViewMode('table'))}
                        >
                            <Sheet />
                        </Button>
                        <ColumnSettings
                            columns={columns}
                            tableName='product_table'
                        />
                    </>
                }
            />
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-5'>
                <Input
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border border-border-color bg-background-foreground'
                    placeholder='Search by name/sku/key features'
                />
                <Select
                    bordered
                    placeholder='Brand'
                    value={brand}
                    data={brandSelectData}
                    onChange={(val) => setBrand(val as string)}
                />
                <Select
                    bordered
                    placeholder='Created By'
                    value={createdBy}
                    data={adminSelectData}
                    onChange={(val) => setCreatedBy(val as string)}
                />
                <Select
                    bordered
                    placeholder='Category'
                    value={category}
                    data={categorySelectData}
                    onChange={(val) => setCategory(val as string)}
                />
                <DatePicker
                    value={createdAt}
                    bordered={true}
                    disableFuture
                    onChange={(val) => setCreateAt(val || null)}
                />
            </div>

            {isFetching ? (
                viewMode === 'table' ? (
                    <TableSkeleton className='pt-2' />
                ) : (
                    <ProductSkeleton className='pt-2' />
                )
            ) : !error && productData?.data ? (
                viewMode === 'table' ? (
                    <DataTable
                        tableName='product_table'
                        columns={columns}
                        data={productData?.data || []}
                    />
                ) : (
                    <AllProductsGridView data={productData?.data || []} />
                )
            ) : (
                <div>Error loading data</div> // Handle the error case
            )}

            <Pagination
                currentPage={page}
                totalItems={paginationData ? paginationData?.total : 0}
                itemsPerPage={20}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AllProducts;
