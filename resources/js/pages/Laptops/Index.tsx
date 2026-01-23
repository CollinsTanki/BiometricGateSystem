import AppLayout from '@/layouts/app-layout';
import { index as laptops } from '@/routes/laptops';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laptops',
        href: laptops().url,
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laptops" />
            <div>
                <a href={laptops().url}>View Laptops</a>
            </div>
        </AppLayout>
    );
}
