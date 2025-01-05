import type { Metadata } from 'next';
import { Suspense } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MainLayout>
            <Suspense>{children}</Suspense>
        </MainLayout>
    );
}
