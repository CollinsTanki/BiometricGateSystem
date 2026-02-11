import AppLayout from '@/layouts/app-layout';
import { index as students } from '@/routes/students';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
  Alert,  
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { CircleAlert } from 'lucide-react';
import type { FormEvent } from 'react';


interface Student {
  id: number,
  full_name: string,
  student_id: string,
  email: string,
  department: string,
  major: string,
  country_code: string,
  phone: string,
  year_of_study: string,
  gender: string,
  photo_url: string,
  fingerprints_urls: string[],
}

export default function Edit({student}: {student: Student}) {
    const {data, setData, put, processing, errors} = useForm({
        full_name: student.full_name,
        student_id: student.student_id,
        email: student.email,
        country_code: student.country_code,
        phone: student.phone,
        department: student.department,
        major: student.major,
        year_of_study: student.year_of_study,
        gender: student.gender,
        photo: null as File | null,
        fingerprints: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/students/' + student.id, {
            forceFormData: true,
        });
    };

    const departments = [
        'Business Administration',
        'Computer Science',
        'Education',
        'Nursing',
        'Theology',
    ];

    const majors = {
        'Business Administration': ['Accounting', 'Finance', 'Marketing'],
        'Computer Science': ['Software Engineering', 'Data Science', 'Cybersecurity'],
        'Education': ['Primary Education', 'Secondary Education'],
        'Nursing': ['General Nursing', 'Midwifery'],
        'Theology': ['Biblical Studies', 'Pastoral Ministry'],
    };

  function handleUpdate(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    put(route('students.update', student.id), {
      forceFormData: true,
    });
  }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Student', href: `/students/${student.id}/edit`}]}>
            <Head title="Edit a Student - Biometric Gate System" />
            <div className="px-4 py-6">
                <div className="space-y-6">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Edit a Student</h1>
                        <p className="text-gray-600 dark:text-gray-300">Fill in the details below to update a student in the biometric system.</p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleUpdate} encType="multipart/form-data">
                        {/* Display errors */}
                        {Object.keys(errors).length > 0 &&(
                          <Alert>
                           <CircleAlert />  
                           <AlertTitle>Errors!</AlertTitle>
                           <AlertDescription>
                           Make sure all fields are filled correctly.
                           </AlertDescription>
                          {/*<AlertAction>
                          <Button variant="outline">Enable</Button>
                          </AlertAction> */}
                          </Alert>
                        )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                type="text"
                                placeholder="Enter full name"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                                className={`mt-1 ${errors.full_name ? 'border-red-500' : ''}`}
                            />
                            {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="student_id">Student ID</Label>
                            <Input
                                id="student_id"
                                type="text"
                                placeholder="Enter student ID"
                                value={data.student_id}
                                onChange={(e) => setData('student_id', e.target.value)}
                                className={`mt-1 ${errors.student_id ? 'border-red-500' : ''}`}
                            />
                            {errors.student_id && <p className="text-red-500 text-sm mt-1">{errors.student_id}</p>}
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                <SelectTrigger className={`mt-1 ${errors.gender ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label htmlFor="country_code">Country Code</Label>
                            <Select value={data.country_code} onValueChange={(value) => setData('country_code', value)}>
                                <SelectTrigger className={`mt-1 ${errors.country_code ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Code" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="+254">+254 (Kenya)</SelectItem>
                                    <SelectItem value="+255">+255 (Tanzania)</SelectItem>
                                    <SelectItem value="+256">+256 (Uganda)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.country_code && <p className="text-red-500 text-sm mt-1">{errors.country_code}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label htmlFor="department">Department</Label>
                            <Select value={data.department} onValueChange={(value) => setData('department', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="major">Major</Label>
                            <Select value={data.major} onValueChange={(value) => setData('major', value)} disabled={!data.department}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select major" />
                                </SelectTrigger>
                                <SelectContent>
                                    {data.department && majors[data.department as keyof typeof majors]?.map((maj) => (
                                        <SelectItem key={maj} value={maj}>{maj}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="year_of_study">Year of Study</Label>
                        <Select value={data.year_of_study} onValueChange={(value) => setData('year_of_study', value)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1st Year</SelectItem>
                                <SelectItem value="2">2nd Year</SelectItem>
                                <SelectItem value="3">3rd Year</SelectItem>
                                <SelectItem value="4">4th Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label htmlFor="photo">Photo</Label>
                            <Input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('photo', e.target.files?.[0] || null)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="fingerprints">Fingerprints</Label>
                            <Input
                                id="fingerprints"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setData('fingerprints', e.target.files ? Array.from(e.target.files) : [])}
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                            {processing ? 'Updating...' : 'Update Student'}
                        </Button>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function route(arg0: string, id: number): string {
  throw new Error('Function not implemented.');
}
