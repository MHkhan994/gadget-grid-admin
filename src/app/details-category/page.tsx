
import CreateNewDetailsCategory from '@/components/details-category/CreateNewDetailsCategory';
import DetailsCategoryInfo from '@/components/details-category/DetailsCategoryInfo';
import axios from 'axios';
import React from 'react'

const DetailsCategory = async () => {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/product-details-category/get-all`)
    const data = res.data

    console.log(data)

    return (
        <>
            <div className='pt-4'>
                <div className='flex justify-between items-center'>
                    <h4 className="text-black page-title">Product Details Category </h4>
                    <CreateNewDetailsCategory />
                </div>

                <DetailsCategoryInfo />
            </div>

        </>
    )
}

export default DetailsCategory