<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GateEntry extends Model
{
    protected $fillable = [
        'full_name',
        'phone',
        'id_number',
        'entry_type',
        'staff_category',
        'reason',
        'commodities',
        'entry_time',
        'exit_time',
    ];

    protected $casts = [
        'entry_time' => 'datetime',
        'exit_time' => 'datetime',
    ];
}