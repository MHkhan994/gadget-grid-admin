
'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as FaIcons from 'react-icons/fa'; // Font Awesome
import * as MdIcons from 'react-icons/md'; // Material Design Icons
import * as TiIcons from 'react-icons/ti'; // Typicons
import * as GiIcons from 'react-icons/gi'; // Game Icons
import * as AiIcons from 'react-icons/ai'; // Ant Design Icons
import * as BsIcons from 'react-icons/bs'; // Bootstrap Icons
import * as BiIcons from 'react-icons/bi'; // Bootstrap Icons
import * as TbIcons from 'react-icons/tb'; // Tabler Icons
import * as IoIcons from 'react-icons/io';

const iconLibraries = {
    ...FaIcons,
    ...MdIcons,
    ...TiIcons,
    ...GiIcons,
    ...AiIcons,
    ...BsIcons,
    ...BiIcons,
    ...TbIcons,
    ...IoIcons,
    // Add more icon libraries here if needed
};

const menus = [
    {
        id: 1,
        title: 'Details Category',
        link: '/details-category',
        icon: "TbListDetails"
    },
    {
        id: 1,
        title: 'Category',
        icon: 'BiCategory',
        children: [
            {
                id: 1,
                title: 'Create Category',
                link: '/category/create-category',
                icon: 'TbCategoryPlus'
            },
            {
                id: 2,
                title: 'All Categories',
                link: '/category/all-categories',
                icon: ''
            }
        ]
    }
]

const Sidebar = () => {
    const pathName = usePathname()
    const [openMenu, setOpenMenu] = useState<number | null>(null)

    const getIcon = (iconName: string) => {
        const IconComponent = iconLibraries[iconName as keyof typeof iconLibraries];
        if (!IconComponent) return null; // Return null if the icon is not found
        return <IconComponent size={18} />;
    };

    return (
        <div className="h-screen overflow-y-auto bg-primary p-4 w-[320px] shadow-md sticky top-0">
            <Image src={"/gadget-grid-logo.png"} height={100} width={200} alt="logo" />

            <div className='pt-8 flex flex-col gap-3'>
                {
                    menus.map(item => {
                        if (!item.children) {
                            return <Link className={`rounded-md py-2  flex items-center gap-2 ${pathName === item.link ? 'bg-white px-4 text-black' : 'text-pure-white'}`} key={item.id} href={item.link}>
                                {getIcon(item.icon)}
                                {item.title}
                            </Link>
                        }
                        else {
                            return <div key={item.id}>
                                <button onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)} className={`text-pure-white py-2 flex justify-between w-full items-center`}>
                                    <div className='flex gap-2 items-center'>
                                        {getIcon(item.icon)}
                                        {item.title}
                                    </div>

                                    <FaIcons.FaChevronDown className={`${openMenu === item.id ? 'rotate-180' : 'rotate-0'} transition-all`} />
                                </button>
                                <div className='ps-3 pt-2 flex flex-col gap-1'>
                                    {openMenu === item.id && item.children.map(child => <Link className={`rounded-md py-2 flex items-center gap-2 ${pathName === child.link ? 'bg-white px-4 text-black' : 'text-pure-white'}`} key={child.id} href={child.link}>
                                        {getIcon(child.icon)}
                                        {child.title}
                                    </Link>)}
                                </div>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar