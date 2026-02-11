import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import type { BreadcrumbItem } from '@/types'
import { Head, Link, usePage, useForm } from '@inertiajs/react'
import { Plus } from 'lucide-react'
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
    title: 'Laptops',
    href: '/laptops',
  },
]

/* ---------------- Types ---------------- */
interface Laptop {
  id: number
  laptop_brand: string
  model_number: string
  serial_number: string
  mac_address: string
  student: {
    id: number
    full_name: string
    student_id: string
    department: string
    year_of_study: string
  }
}

/* ---------------- Page ---------------- */
export default function Index() {
  const { laptops = [], flash = {} } = usePage<{
    laptops: Laptop[]
    flash: { success?: string; error?: string }
  }>().props

  const { processing, delete: destroy } = useForm()

  const handleDelete = (id: number, studentName: string) => {
    if (confirm(`Remove laptop assigned to ${studentName}?`)) {
      destroy(`/laptops/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laptops" />

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

      {/* Action button */}
      <div className="mb-4">
        <Link href="/laptops/create">
          <Button className="bg-sky-500 text-white hover:bg-sky-600">
            <Plus className="mr-2 h-4 w-4" />
            Assign Laptop
          </Button>
        </Link>
      </div>

      {/* Table */}
      {laptops.length > 0 ? (
        <div className="m-4">
          <Table>
            <TableCaption>A list of assigned laptops.</TableCaption>
            <TableHeader className="bg-slate-800 dark:bg-slate-900">
              <TableRow>
                <TableHead className="w-[60px] text-slate-100">ID</TableHead>
                <TableHead className="text-slate-100">Student</TableHead>
                <TableHead className="text-slate-100">Student ID</TableHead>
                <TableHead className="text-slate-100">Department</TableHead>
                <TableHead className="text-slate-100">Year</TableHead>
                <TableHead className="text-slate-100">Brand</TableHead>
                <TableHead className="text-slate-100">Model</TableHead>
                <TableHead className="text-slate-100">Serial</TableHead>
                <TableHead className="text-slate-100">MAC</TableHead>
                <TableHead className="text-center text-slate-100">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {laptops.map((laptop) => (
                <TableRow key={laptop.id}>
                  <TableCell>{laptop.id}</TableCell>
                  <TableCell>{laptop.student.full_name}</TableCell>
                  <TableCell>{laptop.student.student_id}</TableCell>
                  <TableCell>{laptop.student.department}</TableCell>
                  <TableCell>{laptop.student.year_of_study}</TableCell>
                  <TableCell>{laptop.laptop_brand}</TableCell>
                  <TableCell>{laptop.model_number}</TableCell>
                  <TableCell>{laptop.serial_number}</TableCell>
                  <TableCell>{laptop.mac_address}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Link href={`/laptops/${laptop.id}/edit`}>
                      <Button className="bg-slate-600 hover:bg-slate-700">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      disabled={processing}
                      onClick={() =>
                        handleDelete(laptop.id, laptop.student.full_name)
                      }
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
            No laptops assigned yet. Assign a laptop to a student.
          </p>
        </div>
      )}
    </AppLayout>
  )
}
