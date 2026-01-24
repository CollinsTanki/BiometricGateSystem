<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class GateController extends Controller
{
    public function index(){
        return inertia::render('GateEntries/Index', []);
    }
}
