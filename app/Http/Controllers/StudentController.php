<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
class StudentController extends Controller
{
    public function index(){
        $students = Student::all();
        return Inertia::render('Students/Index', compact('students'));
    }

    public function create(){
        return Inertia::render('Students/Create');
    }

    public function store(Request $request){
        $request->validate([
            'full_name' => 'required|string|max:255',
            'student_id' => 'required|string|unique:students,student_id',
            'email' => 'required|email|unique:students,email',
            'country_code' => 'required|string',
            'phone' => 'required|string|max:20',
            'department' => 'required|string',
            'major' => 'required|string',
            'year_of_study' => 'required|string',
            'gender' => 'required|in:Male,Female,Other',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fingerprints' => 'nullable|array',
            'fingerprints.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only([
            'full_name', 'student_id', 'email', 'department', 'major', 'year_of_study', 'gender'
        ]);

        $data['phone'] = $request->country_code . $request->phone;

        $data['photo'] = null;
        $data['fingerprints'] = null;

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('photos', 'public');
        }

        // Handle fingerprints upload
        if ($request->hasFile('fingerprints')) {
            $fingerprintsPaths = [];
            foreach ($request->file('fingerprints') as $file) {
                $fingerprintsPaths[] = $file->store('fingerprints', 'public');
            }
            $data['fingerprints'] = json_encode($fingerprintsPaths);
        }

            Student::create($data);
    
            return redirect()->route('students.index')->with('success', 'Student created successfully.');
        }
        public function edit(Student $student) {
            return Inertia::render('Students/Edit', compact('student'));
        }
        public function update(Request $request, Student $student) {
            $request->validate([
                'full_name' => 'required|string|max:255',
                'student_id' => 'required|string|unique:students,student_id,' . $student->id,
                'email' => 'required|email|unique:students,email,' . $student->id,
                'country_code' => 'required|string',
                'phone' => 'required|string|max:20',
                'department' => 'required|string',
                'major' => 'required|string',
                'year_of_study' => 'required|string',
                'gender' => 'required|in:Male,Female,Other',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'fingerprints' => 'nullable|array',
                'fingerprints.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $student->update([
                'full_name' => $request->input('full_name'),
                'student_id' => $request->input('student_id'),
                'email' => $request->input('email'),
                'department' => $request->input('department'),
                'major' => $request->input('major'),
                'year_of_study' => $request->input('year_of_study'),
                'gender' => $request->input('gender'),
                               

            ]);

            $data = $request->only([
                'full_name', 'student_id', 'email', 'department', 'major', 'year_of_study', 'gender'
            ]);

            $data['phone'] = $request->country_code . $request->phone;

            if ($request->hasFile('photo')) {
                $data['photo'] = $request->file('photo')->store('photos', 'public');
            }

            if ($request->hasFile('fingerprints')) {
                $fingerprintsPaths = [];
                foreach ($request->file('fingerprints') as $file) {
                    $fingerprintsPaths[] = $file->store('fingerprints', 'public');
                }
                $data['fingerprints'] = json_encode($fingerprintsPaths);
            }

            $student->update($data);

            return redirect()->route('students.index')->with('message', 'Student updated successfully.');
        }
        public function destroy(Student $student) {
            $student->delete();
            return redirect()->route('students.index')->with('message', 'Student Deleted Successfully');
        }
    }