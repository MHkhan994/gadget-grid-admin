'use client';

import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TProduct } from '@/interface/product.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProduct } from '@/redux/reducers/products/productSlice';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import ImageGallery from '../ImageGallery';
import { useGetAllCategoriesQuery } from '@/redux/api/categories';
import TreeDropdown from '@/components/custom/TreeDropdown';

const AddBasicData = () => {
  const dispatch = useAppDispatch();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { product } = useAppSelector((state) => state.products);
  const { data: categoryData } = useGetAllCategoriesQuery(true);
  // const [subCategorySelectData, setSubCategorySelectData] = useState<TSelectOptions[] | []>([])
  const {
    gallery,
    description,
    name,
    brand,
    model,
    warranty,
    price,
    quantity,
    category,
  } = product;

  const handleChange = <K extends keyof TProduct>(
    key: K,
    value: TProduct[K],
  ) => {
    dispatch(updateProduct({ key, value }));
  };

  const handleRemoveFromGallery = (img: string) => {
    const filteredGallery = gallery?.filter((image) => image !== img) || [];

    dispatch(updateProduct({ key: 'gallery', value: filteredGallery }));
  };

  return (
    <div>
      <h2 className="pb-5 text-lg font-semibold text-black">
        General Information
      </h2>
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Name *</label>
          <Input
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter Product Name"
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="text-sm">Category *</label>
          <Select
            data={categorySelectData}
            onChange={(value) => handleChange('category', value as string)}
            placeholder="Select category"
            value={category}
          />
        </div> */}

        <div className="flex flex-col gap-2">
          <label className="text-sm">Category *</label>
          <TreeDropdown
            value={category}
            categories={categoryData?.data}
            onSelect={(val) => handleChange('category', val)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Brand *</label>
          <Input
            value={brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter Brand Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Model *</label>
          <Input
            value={model}
            onChange={(e) => handleChange('model', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter Brand Name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Warranty *</label>
          <Input
            value={warranty}
            onChange={(e) => handleChange('warranty', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter product name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Price *</label>
          <Input
            value={price}
            type="number"
            onChange={(e) => handleChange('price', parseInt(e.target.value))}
            className="bg-background-foreground"
            placeholder="Enter Price"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Stock *</label>
          <Input
            value={quantity}
            type="number"
            onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
            className="bg-background-foreground"
            placeholder="Enter stock"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Key Features *</label>
          <MarkdownEditor
            className="h-56 overflow-y-auto overflow-x-hidden scrollbar-thin"
            markdown={description}
            onChange={(val) => handleChange('key_features', val)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Gallery *</label>
          <div
            className={`flex h-full min-h-52 flex-col items-center gap-2 rounded-md bg-background-foreground p-3 ${gallery?.length === 0 && 'justify-center'}`}
          >
            {gallery && gallery?.length <= 5 && (
              <Button className="w-fit" onClick={() => setGalleryOpen(true)}>
                Select From Gallery
              </Button>
            )}
            <div className="grid w-full grid-cols-5 gap-2 p-3">
              {gallery?.map((img: string) => {
                return (
                  <div key={img} className="relative max-h-32">
                    <div
                      onClick={() => handleRemoveFromGallery(img)}
                      className="absolute left-2 top-2 z-40 cursor-pointer bg-lavender-mist text-red"
                    >
                      <IoMdClose />
                    </div>
                    <Image
                      src={img}
                      height={200}
                      width={200}
                      alt="gallery img"
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ImageGallery open={galleryOpen} setOpen={setGalleryOpen} />
    </div>
  );
};

export default AddBasicData;
