import AppLayout from '@/layouts/app-layout';
import { index as students } from '@/routes/students';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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
                <Link href="/students/create">
                    <Button className="bg-sky-500 text-white hover:bg-sky-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Student
                    </Button>
                </Link>
            </div>
        </AppLayout>
    );
}
