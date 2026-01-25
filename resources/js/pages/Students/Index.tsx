import AppLayout from '@/layouts/app-layout';
import { index as students } from '@/routes/students';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: students().url,
    },
];

export default function Index() {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            
            {flash.success && <div>{flash.success}</div>}
            {flash.error && <div>{flash.error}</div>}
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
