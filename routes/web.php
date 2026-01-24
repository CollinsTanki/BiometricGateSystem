<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\LaptopController;
use App\Http\Controllers\GateController;
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
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');

    Route::get('/laptops', [LaptopController::class, 'index'])->name('laptops.index');

    Route::get('/gateentries', [GateController::class, 'index'])->name('gateentries.index');
});

require __DIR__.'/settings.php';
