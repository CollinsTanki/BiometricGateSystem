import AppLayout from '@/layouts/app-layout';
import { index as studentsRoute } from '@/routes/students';
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
        title: 'Students',
        href: studentsRoute().url,
    },
];

interface Student {
    id : number,
    full_name : string,
    student_id : string,
    email : string,
    department : string,
    major : string,
    year_of_study : string,
    gender : string,
}
interface StudentsPageProps {
    students : Student[],
}

export default function Index() {
    const {students, flash } = usePage<{ students: Student[]; flash: { success?: string; error?: string } }>().props;
    const {processing, delete: destroy} = useForm();
    const handleDelete = (id: number, full_name: string) => {
        if(confirm(`Do you want to delete a student ${id}.${full_name}?`))
            destroy(`/students/${id}`)
    }
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
            {students.length > 0 && (
                <div className='m-4'>
                    <Table>
                    <TableCaption>A list of your recent students.</TableCaption>
                   <TableHeader className="bg-slate-800 dark:bg-slate-900">
                    <TableRow>
                        <TableHead className="w-[100px] font-semibold text-slate-100 dark:text-slate-200">ID</TableHead>
                        <TableHead className="font-semibold text-slate-100 dark:text-slate-200">Full Name</TableHead>
                        <TableHead className="font-semibold text-slate-100 dark:text-slate-200">Student ID</TableHead>
                        <TableHead className="text-right font-semibold text-slate-100 dark:text-slate-200">Gender</TableHead>
                        <TableHead className="text-right font-semibold text-slate-100 dark:text-slate-200">Email</TableHead>
                        <TableHead className="text-right font-semibold text-slate-100 dark:text-slate-200">Department</TableHead>
                        <TableHead className="text-right font-semibold text-slate-100 dark:text-slate-200">Major</TableHead>
                        <TableHead className="text-right font-semibold text-slate-100 dark:text-slate-200">Year of Study</TableHead>
                    </TableRow>
                    </TableHeader>
  <TableBody>
  {students.map((student) => (
    <TableRow key={student.id}>
      <TableCell className="font-medium">{student.id}</TableCell>
      <TableCell>{student.full_name}</TableCell>
      <TableCell>{student.student_id}</TableCell>
      <TableCell className="text-right">{student.gender}</TableCell>
      <TableCell className="text-right">{student.email}</TableCell>
      <TableCell className="text-right">{student.department}</TableCell>
      <TableCell className="text-right">{student.major}</TableCell>
      <TableCell className="text-right">{student.year_of_study}</TableCell>
      <TableCell><Button onClick={() => handleDelete(student.id, student.full_name)} className="bg-red-500 hover:bg-red-700">Delete</Button></TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>

    

                
        

                </div>
                

            )}
        </AppLayout>
    );
}
