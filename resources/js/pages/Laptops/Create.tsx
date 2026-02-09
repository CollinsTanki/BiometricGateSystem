import AppLayout from '@/layouts/app-layout'
import { Head, useForm, usePage, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { BreadcrumbItem } from '@/types'

/* ---------------- Breadcrumbs ---------------- */
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Students', href: '/students' },
  { title: 'Assign Laptop', href: '#' },
]

/* ---------------- Types ---------------- */
interface Student {
  id: number
  full_name: string
  student_id: string
  email: string
  department: string
  year_of_study: string
  gender: string
  photo?: string
}

/* ---------------- Laptop Brand → Models ---------------- */
const laptopModels: Record<string, string[]> = {
  HP: ['EliteBook 840', 'ProBook 450', 'Pavilion 15'],
  Dell: ['Latitude 5420', 'Inspiron 15', 'XPS 13'],
  Lenovo: ['ThinkPad X1', 'ThinkPad T14', 'IdeaPad 3'],
  Apple: ['MacBook Air M1', 'MacBook Air M2', 'MacBook Pro M2'],
  Acer: ['Aspire 5', 'Swift 3'],
}

/* ---------------- Page ---------------- */
export default function Create() {
  const { student } = usePage<{ student: Student }>().props

  const { data, setData, post, processing, errors } = useForm({
    student_id: student.id,
    laptop_brand: '',
    model_number: '',
    serial_number: '',
    mac_address: '',
  })

  const models =
    data.laptop_brand ? laptopModels[data.laptop_brand] ?? [] : []

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/laptops')
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Assign Laptop" />

      <form onSubmit={submit} className="space-y-6">

        {/* ---------------- Student Details (Prefilled) ---------------- */}
        <div className="rounded-lg border p-6 bg-slate-50 dark:bg-slate-900">
          <h2 className="text-lg font-semibold mb-4">Student Information</h2>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Full Name</TableCell>
                <TableCell>{student.full_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Student ID</TableCell>
                <TableCell>{student.student_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Gender</TableCell>
                <TableCell>{student.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Department</TableCell>
                <TableCell>{student.department}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Year of Study</TableCell>
                <TableCell>{student.year_of_study}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {student.photo && (
            <div className="mt-4">
              <img
                src={student.photo}
                alt="Student Photo"
                className="h-32 rounded border"
              />
            </div>
          )}
        </div>

        {/* ---------------- Laptop Details ---------------- */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Laptop Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Brand */}
            <div>
              <label className="block mb-1 font-medium">Laptop Brand</label>
              <select
                className="w-full border rounded p-2"
                value={data.laptop_brand}
                onChange={(e) => {
                  setData('laptop_brand', e.target.value)
                  setData('model_number', '')
                }}
              >
                <option value="">Select brand</option>
                {Object.keys(laptopModels).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.laptop_brand && (
                <p className="text-red-500 text-sm">{errors.laptop_brand}</p>
              )}
            </div>

            {/* Model */}
            <div>
              <label className="block mb-1 font-medium">Model Number</label>
              <select
                className="w-full border rounded p-2"
                value={data.model_number}
                disabled={!data.laptop_brand}
                onChange={(e) => setData('model_number', e.target.value)}
              >
                <option value="">Select model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              {errors.model_number && (
                <p className="text-red-500 text-sm">{errors.model_number}</p>
              )}
            </div>

            {/* Serial */}
            <div>
              <label className="block mb-1 font-medium">Serial Number</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={data.serial_number}
                onChange={(e) => setData('serial_number', e.target.value)}
              />
            </div>

            {/* MAC */}
            <div>
              <label className="block mb-1 font-medium">MAC Address</label>
              <input
                type="text"
                placeholder="00:1A:2B:3C:4D:5E"
                className="w-full border rounded p-2"
                value={data.mac_address}
                onChange={(e) => setData('mac_address', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ---------------- Actions ---------------- */}
        <div className="flex gap-3">
          <Button type="submit" disabled={processing} className="bg-sky-600">
            Assign Laptop
          </Button>
          <Link href="/students">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </AppLayout>
  )
}
