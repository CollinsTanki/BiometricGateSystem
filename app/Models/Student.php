<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'full_name',
        'student_id',
        'email',
        'phone',
        'department',
        'major',
        'year_of_study',
        'gender',
        'photo',
        'fingerprints',
    ];
}
