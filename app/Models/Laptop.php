<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laptop extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'laptop_brand',
        'model_number',
        'serial_number',
        'mac_address',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
