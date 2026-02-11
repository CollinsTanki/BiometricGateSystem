import AppLayout from '@/layouts/app-layout';
import { index as gateEntries } from '@/routes/gateentries';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gate Entries',
        href: gateEntries().url,
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gate Entries" />
            <div className="container mx-auto p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Gate Entries</h1>
                    <p className="text-gray-600 mb-6">
                        Track and manage student laptop check-ins and check-outs
                    </p>
                    <a 
                        href={gateEntries().url} 
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Gate Entries
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}