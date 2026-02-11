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
import type { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';
import { CircleAlert, CircleCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Students', href: '/students' },
    { title: 'Create', href: '/students/create' },
];

export default function Create() {
    const { flash } = usePage<{
        flash?: {
            success?: string;
            student_id?: number;
        };
    }>().props;

    const [showSuccess, setShowSuccess] = useState(!!flash?.success);

    const form = useForm({
        full_name: '',
        student_id: '',
        email: '',
        country_code: '+254',
        phone: '',
        department: '',
        major: '',
        year_of_study: '',
        gender: '',
        photo: null as File | null,
        fingerprints: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/students', {
            forceFormData: true,
        });
    };

    /** ✅ Success → hide after 5s → redirect */
    useEffect(() => {
        if (flash?.success && flash?.student_id) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                router.visit(
                    `/laptops/create?student_id=${flash.student_id}`
                );
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    const departments = [
        'Business Administration',
        'Computer Science',
        'Education',
        'Nursing',
        'Theology',
    ];

    const majors: Record<string, string[]> = {
        'Business Administration': ['Accounting', 'Finance', 'Marketing'],
        'Computer Science': [
            'Software Engineering',
            'Data Science',
            'Cybersecurity',
        ],
        Education: ['Primary Education', 'Secondary Education'],
        Nursing: ['General Nursing', 'Midwifery'],
        Theology: ['Biblical Studies', 'Pastoral Ministry'],
    };

    const hasErrors = Object.keys(form.errors).length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Student" />

            <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold">
                        Create New Student
                    </h1>
                    <p className="text-muted-foreground">
                        Register a new student in the biometric system
                    </p>
                </div>

                {/* ✅ Success Alert */}
                {showSuccess && flash?.success && (
                    <Alert className="border-green-500 text-green-700">
                        <CircleCheck className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            {flash.success} <br />
                            Redirecting to laptop assignment…
                        </AlertDescription>
                    </Alert>
                )}

                {/* ❌ Validation Alert */}
                {hasErrors && (
                    <Alert variant="destructive">
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>Errors</AlertTitle>
                        <AlertDescription>
                            Please correct the highlighted fields.
                        </AlertDescription>
                    </Alert>
                )}

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-6"
                >
                    {/* Name / ID / Gender */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input
                                className={`mt-1 ${
                                    form.errors.full_name
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                value={form.data.full_name}
                                onChange={(e) =>
                                    form.setData(
                                        'full_name',
                                        e.target.value
                                    )
                                }
                            />
                            {form.errors.full_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.full_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Student ID</Label>
                            <Input
                                className={`mt-1 ${
                                    form.errors.student_id
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                value={form.data.student_id}
                                onChange={(e) =>
                                    form.setData(
                                        'student_id',
                                        e.target.value
                                    )
                                }
                            />
                            {form.errors.student_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.student_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Gender</Label>
                            <Select
                                value={form.data.gender}
                                onValueChange={(v) =>
                                    form.setData('gender', v)
                                }
                            >
                                <SelectTrigger
                                    className={`mt-1 ${
                                        form.errors.gender
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                >
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="Female">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="Other">
                                        Other
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {form.errors.gender && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.gender}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            className={`mt-1 ${
                                form.errors.email
                                    ? 'border-red-500'
                                    : ''
                            }`}
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                        />
                        {form.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <Label>Country Code</Label>
                            <Select
                                value={form.data.country_code}
                                onValueChange={(v) =>
                                    form.setData('country_code', v)
                                }
                            >
                                <SelectTrigger
                                    className={`mt-1 ${
                                        form.errors.country_code
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="+254">
                                        +254 (Kenya)
                                    </SelectItem>
                                    <SelectItem value="+255">
                                        +255 (Tanzania)
                                    </SelectItem>
                                    <SelectItem value="+256">
                                        +256 (Uganda)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {form.errors.country_code && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.country_code}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <Label>Phone</Label>
                            <Input
                                className={`mt-1 ${
                                    form.errors.phone
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                value={form.data.phone}
                                onChange={(e) =>
                                    form.setData('phone', e.target.value)
                                }
                            />
                            {form.errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Department / Major */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Department</Label>
                            <Select
                                value={form.data.department}
                                onValueChange={(v) =>
                                    form.setData('department', v)
                                }
                            >
                                <SelectTrigger
                                    className={`mt-1 ${
                                        form.errors.department
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                >
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((d) => (
                                        <SelectItem key={d} value={d}>
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.department && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.department}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Major</Label>
                            <Select
                                disabled={!form.data.department}
                                value={form.data.major}
                                onValueChange={(v) =>
                                    form.setData('major', v)
                                }
                            >
                                <SelectTrigger
                                    className={`mt-1 ${
                                        form.errors.major
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                >
                                    <SelectValue placeholder="Select major" />
                                </SelectTrigger>
                                <SelectContent>
                                    {majors[form.data.department]?.map(
                                        (m) => (
                                            <SelectItem key={m} value={m}>
                                                {m}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                            {form.errors.major && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.errors.major}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Year */}
                    <div>
                        <Label>Year of Study</Label>
                        <Select
                            value={form.data.year_of_study}
                            onValueChange={(v) =>
                                form.setData('year_of_study', v)
                            }
                        >
                            <SelectTrigger
                                className={`mt-1 ${
                                    form.errors.year_of_study
                                        ? 'border-red-500'
                                        : ''
                                }`}
                            >
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">
                                    1st Year
                                </SelectItem>
                                <SelectItem value="2">
                                    2nd Year
                                </SelectItem>
                                <SelectItem value="3">
                                    3rd Year
                                </SelectItem>
                                <SelectItem value="4">
                                    4th Year
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {form.errors.year_of_study && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.errors.year_of_study}
                            </p>
                        )}
                    </div>

                    {/* Files */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    form.setData(
                                        'photo',
                                        e.target.files?.[0] || null
                                    )
                                }
                            />
                        </div>

                        <div>
                            <Label>Fingerprints</Label>
                            <Input
                                type="file"
                                multiple
                                onChange={(e) =>
                                    form.setData(
                                        'fingerprints',
                                        e.target.files
                                            ? Array.from(e.target.files)
                                            : []
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Creating...'
                                : 'Create Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
