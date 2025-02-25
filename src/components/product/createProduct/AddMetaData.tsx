import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/redux/hooks';
import { MDXEditorMethods } from '@mdxeditor/editor';
import React, { useRef, useState } from 'react';
import ImageGallery from '../ImageGallery';
import { Button } from '@/components/ui/button';
import { handleProductChange, isValidUrl } from '@/lib/utils';
import Image from 'next/image';
import { X } from 'lucide-react';

const AddMetaData = ({ edit }: { edit: boolean }) => {
    const metaDescriptionRef = useRef<MDXEditorMethods>(null);
    const { editProduct, product } = useAppSelector((s) => s.products);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const { meta } = edit ? editProduct : product;

    const handleDescriptionChange = () => {
        const val: string = metaDescriptionRef.current
            ? metaDescriptionRef.current.getMarkdown()
            : '';
        handleProductChange(
            'meta',
            {
                title: meta?.title || '',
                description: val,
                image: meta?.image || '',
            },
            edit,
        );
    };

    return (
        <div>
            <h2 className='text-lg font-semibold text-black'>Meta Data</h2>

            <div className='mt-3 flex flex-col gap-4'>
                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Title</label>
                    <Input
                        value={meta?.title}
                        onChange={(e) =>
                            handleProductChange(
                                'meta',
                                {
                                    title: e.target.value,
                                    description: meta?.description || '',
                                    image: meta?.image || '',
                                },
                                edit,
                            )
                        }
                        className='bg-background-foreground'
                        placeholder='Enter Product Name'
                    />
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Image *</label>
                    <div
                        className={`flex h-full min-h-52 flex-col items-center justify-center gap-2 rounded-md bg-background-foreground p-3`}
                    >
                        <div className='grid w-full gap-2 p-3'>
                            <div className='relative flex h-full max-h-32 items-center justify-center'>
                                {!isValidUrl(meta?.image || '') && (
                                    <Button
                                        className='w-fit'
                                        onClick={() => setGalleryOpen(true)}
                                    >
                                        Select thumbnail
                                    </Button>
                                )}
                                {isValidUrl(meta?.image || '') && (
                                    <div className='relative'>
                                        <div
                                            onClick={() =>
                                                handleProductChange(
                                                    'meta',
                                                    {
                                                        title:
                                                            meta?.title || '',
                                                        description:
                                                            meta?.description ||
                                                            '',
                                                        image: '',
                                                    },
                                                    edit,
                                                )
                                            }
                                            className='absolute left-2 top-2 z-40 cursor-pointer bg-lavender-mist text-red'
                                        >
                                            <X />
                                        </div>
                                        <Image
                                            src={meta?.image as string}
                                            height={200}
                                            width={200}
                                            alt='gallery img'
                                            className='h-full object-cover'
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-3 flex w-full flex-col gap-2'>
                    <label className='text-sm'>Description *</label>
                    <MarkdownEditor
                        ref={metaDescriptionRef}
                        className='h-56 overflow-y-auto overflow-x-hidden scrollbar-thin'
                        markdown={meta?.description || ''}
                        onChange={handleDescriptionChange}
                    />
                </div>
            </div>
            <ImageGallery
                open={galleryOpen}
                multiselect={false}
                setOpen={setGalleryOpen}
                onChange={(val) =>
                    handleProductChange(
                        'meta',
                        {
                            title: meta?.title || '',
                            description: meta?.description || '',
                            image: val as string,
                        },
                        edit,
                    )
                }
            />
        </div>
    );
};

export default AddMetaData;
