<?php

namespace App\Http\Controllers;

use App\Models\Laptop;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaptopController extends Controller
{
    public function index()
    {
        return Inertia::render('Laptops/Index', []);
    }

    public function create(Request $request)
    {
        // Expecting ?student_id=ID
        $student = Student::findOrFail($request->student_id);

        return Inertia::render('Laptops/Create', [
            'student' => $student
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id'     => ['required', 'exists:students,id'],
            'laptop_brand'   => ['required', 'string', 'max:100'],
            'model_number'   => ['required', 'string', 'max:100'],
            'serial_number'  => ['required', 'string', 'max:100', 'unique:laptops,serial_number'],
            'mac_address'    => ['required', 'string', 'max:50', 'unique:laptops,mac_address'],
        ]);

        // 🔒 Prevent assigning more than one laptop to a student
        $alreadyAssigned = Laptop::where('student_id', $validated['student_id'])->exists();

        if ($alreadyAssigned) {
            return back()->with('error', 'This student already has a laptop assigned.');
        }

        Laptop::create($validated);

        return redirect()
            ->route('students.index')
            ->with('success', 'Laptop assigned to student successfully.');
    }
}
