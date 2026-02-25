import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import type { BreadcrumbItem } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/* ---------------- Breadcrumbs ---------------- */
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Laptop Management',
    href: '/laptops',
  },
]

/* ---------------- Types ---------------- */
interface Student {
  id: number
  full_name: string
  student_id: string
  department: string
  year_of_study: string
  laptop?: {
    id: number
    laptop_brand: string
    model_number: string
  } | null
}

/* ---------------- Page ---------------- */
export default function Index() {

  const { students = [], flash = {} } = usePage<{
    students: Student[]
    flash: { success?: string; error?: string }
  }>().props

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laptop Management" />

      {/* Flash messages */}
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

      {students.length > 0 ? (
        <div className="m-4">
          <Table>
            <TableCaption>Students and Laptop Assignment Status</TableCaption>

            <TableHeader className="bg-slate-800 dark:bg-slate-900">
              <TableRow>
                <TableHead className="text-slate-100">ID</TableHead>
                <TableHead className="text-slate-100">Full Name</TableHead>
                <TableHead className="text-slate-100">Student ID</TableHead>
                <TableHead className="text-slate-100">Department</TableHead>
                <TableHead className="text-slate-100">Year</TableHead>
                <TableHead className="text-slate-100">Laptop Status</TableHead>
                <TableHead className="text-center text-slate-100">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.full_name}</TableCell>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.year_of_study}</TableCell>

                  {/* Laptop Status */}
                  <TableCell>
                    {student.laptop ? (
                      <span className="px-3 py-1 text-sm font-semibold rounded bg-green-100 text-green-700">
                        {student.laptop.laptop_brand} {student.laptop.model_number}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-semibold rounded bg-gray-200 text-gray-600">
                        Not Assigned
                      </span>
                    )}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-center">
                    {student.laptop ? (
                      <Button disabled className="bg-gray-400 cursor-not-allowed">
                        Assigned
                      </Button>
                    ) : (
                      <Link href={`/laptops/create?student_id=${student.id}`}>
                        <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                          Assign Laptop
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p className="text-lg">
            No students found.
          </p>
        </div>
      )}
    </AppLayout>
  )
}
