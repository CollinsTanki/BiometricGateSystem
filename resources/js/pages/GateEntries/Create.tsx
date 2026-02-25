import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';
import { CircleAlert, CircleCheck } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Gate Entries', href: '/gateentries' },
    { title: 'Create', href: '/gateentries/create' },
];

export default function Create() {
    const { flash } = usePage<{
        flash?: {
            success?: string;
        };
    }>().props;

    const [showSuccess, setShowSuccess] = useState(!!flash?.success);

    const form = useForm({
        full_name: '',
        phone: '',
        id_number: '',
        entry_type: '', // visitor | supplier | staff
        staff_category: '', // teaching | guard | cleaner
        reason: '',
        commodities: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/gateentries');
    };

    const hasErrors = Object.keys(form.errors).length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Gate Entry" />

            <div className="px-4 py-6 max-w-3xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold">
                        Gate Entry Registration
                    </h1>
                    <p className="text-muted-foreground">
                        Register visitors, suppliers, and staff members
                    </p>
                </div>

                {/* Success Alert */}
                {showSuccess && flash?.success && (
                    <Alert className="border-green-500 text-green-700">
                        <CircleCheck className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            {flash.success}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error Alert */}
                {hasErrors && (
                    <Alert variant="destructive">
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>Errors</AlertTitle>
                        <AlertDescription>
                            Please correct the highlighted fields.
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input
                                className={form.errors.full_name ? 'border-red-500 mt-1' : 'mt-1'}
                                value={form.data.full_name}
                                onChange={(e) =>
                                    form.setData('full_name', e.target.value)
                                }
                            />
                            {form.errors.full_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.full_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>ID / Passport Number</Label>
                            <Input
                                className={form.errors.id_number ? 'border-red-500 mt-1' : 'mt-1'}
                                value={form.data.id_number}
                                onChange={(e) =>
                                    form.setData('id_number', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            className="mt-1"
                            value={form.data.phone}
                            onChange={(e) =>
                                form.setData('phone', e.target.value)
                            }
                        />
                    </div>

                    {/* Entry Type */}
                    <div>
                        <Label>Entry Type</Label>
                        <Select
                            value={form.data.entry_type}
                            onValueChange={(v) => {
                                form.setData('entry_type', v);
                                form.setData('reason', '');
                                form.setData('commodities', '');
                                form.setData('staff_category', '');
                            }}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select entry type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="visitor">
                                    Visitor
                                </SelectItem>
                                <SelectItem value="supplier">
                                    Supplier
                                </SelectItem>
                                <SelectItem value="staff">
                                    Staff Member
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Visitor Reason */}
                    {form.data.entry_type === 'visitor' && (
                        <div>
                            <Label>Reason for Visit</Label>
                            <Textarea
                                className="mt-1"
                                placeholder="Enter reason for visit..."
                                value={form.data.reason}
                                onChange={(e) =>
                                    form.setData('reason', e.target.value)
                                }
                            />
                        </div>
                    )}

                    {/* Supplier Commodities */}
                    {form.data.entry_type === 'supplier' && (
                        <div>
                            <Label>Commodities Supplied</Label>
                            <Textarea
                                className="mt-1"
                                placeholder="List commodities being supplied..."
                                value={form.data.commodities}
                                onChange={(e) =>
                                    form.setData('commodities', e.target.value)
                                }
                            />
                        </div>
                    )}

                    {/* Staff Category */}
                    {form.data.entry_type === 'staff' && (
                        <div>
                            <Label>Staff Category</Label>
                            <Select
                                value={form.data.staff_category}
                                onValueChange={(v) =>
                                    form.setData('staff_category', v)
                                }
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select staff category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="teaching">
                                        Teaching Staff
                                    </SelectItem>
                                    <SelectItem value="guard">
                                        Guard (Non-Teaching)
                                    </SelectItem>
                                    <SelectItem value="cleaner">
                                        Cleaner (Non-Teaching)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="text-center">
                        <Button type="submit" disabled={form.processing}>
                            {form.processing
                                ? 'Saving...'
                                : 'Register Entry'}
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}