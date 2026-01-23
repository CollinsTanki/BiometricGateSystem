import AppLayout from '@/layouts/app-layout';
//import { students } from '@/routes/students'; 
import { index as students } from '@/routes/students';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: students().url,
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div>
                <a href={students().url}>View Students</a>
            </div>
        </AppLayout>
    );
}
