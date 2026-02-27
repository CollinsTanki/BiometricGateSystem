import AppLayout from '@/layouts/app-layout';
import { index as gateEntriesRoute } from '@/routes/gateentries';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gate Entries',
        href: gateEntriesRoute().url,
    },
];

interface GateEntry {
    id: number;
    full_name: string;
    id_number: string;
    entry_type: string;
    staff_category?: string;
    reason?: string;
    commodities?: string;
    entry_time: string;
    exit_time?: string;
}

export default function Index() {

    const { gateEntries = [], flash = {} } = usePage<{
        gateEntries: GateEntry[];
        flash: { success?: string; error?: string }
    }>().props;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, full_name: string) => {
        if (confirm(`Do you want to delete gate entry ${id}. ${full_name}?`)) {
            destroy(`/gate-entries/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gate Entries" />

            {flash.success && (
                <div className="p-4 mb-4 bg-green-100 text-green-700 rounded">
                    {flash.success}
                </div>
            )}

            {flash.error && (
                <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
                    {flash.error}
                </div>
            )}

            {/* Add Button */}
            <div className="mb-4">
                <Link href="/gateentries/create">
                    <Button className="bg-sky-500 text-white hover:bg-sky-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Gate Entry
                    </Button>
                </Link>
            </div>

            {gateEntries && gateEntries.length > 0 ? (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of recent gate entries.</TableCaption>
                        <TableHeader className="bg-slate-800 dark:bg-slate-900">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-100">ID</TableHead>
                                <TableHead className="font-semibold text-slate-100">Full Name</TableHead>
                                <TableHead className="font-semibold text-slate-100">ID Number</TableHead>
                                <TableHead className="font-semibold text-slate-100 text-right">Type</TableHead>
                                <TableHead className="font-semibold text-slate-100 text-right">Details</TableHead>
                                <TableHead className="font-semibold text-slate-100 text-right">Entry Time</TableHead>
                                <TableHead className="font-semibold text-slate-100 text-right">Exit Time</TableHead>
                                <TableHead className="font-semibold text-slate-100 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gateEntries.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell className="font-medium">{entry.id}</TableCell>
                                    <TableCell>{entry.full_name}</TableCell>
                                    <TableCell>{entry.id_number}</TableCell>

                                    <TableCell className="text-right capitalize">
                                        {entry.entry_type}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {entry.entry_type === 'visitor' && entry.reason}
                                        {entry.entry_type === 'supplier' && entry.commodities}
                                        {entry.entry_type === 'staff' && entry.staff_category}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {new Date(entry.entry_time).toLocaleString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {entry.exit_time
                                            ? new Date(entry.exit_time).toLocaleString()
                                            : <span className="text-yellow-500 font-semibold">Inside</span>
                                        }
                                    </TableCell>

                                    <TableCell className="text-center space-x-2">
                                        <Link href={`/gate-entries/${entry.id}/edit`}>
                                            <Button className="bg-slate-600 hover:bg-slate-700">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(entry.id, entry.full_name)}
                                            className="bg-red-500 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">
                        No gate entries found. Click the button above to add a new entry.
                    </p>
                </div>
            )}
        </AppLayout>
    );
}