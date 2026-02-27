<?php

use App\Http\Controllers\GateController;
use App\Http\Controllers\LaptopController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
           /* Laptops   */
    Route::get('/laptops', [LaptopController::class, 'index'])->name('laptops.index');
    Route::get('/laptops/create', [LaptopController::class, 'create'])->name('laptops.create');
     Route::post('/laptops', [LaptopController::class, 'store'])->name('laptops.store');


            /*Gate Entries*/
    Route::get('/gateentries', [GateController::class, 'index'])->name('gateentries.index');
    Route::get('/gateentries/create', [GateController::class, 'create'])->name('gateentries.create');
    Route::post('/gateentries', [GateController::class, 'store'])->name('gateentries.store');



});

require __DIR__.'/settings.php';
