<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GateEntry;

class GateController extends Controller
{
    /**
     * Display all gate entries
     */
    public function index()
    {
        $gateEntries = GateEntry::latest()->get();

        return Inertia::render('GateEntries/Index', [
            'gateEntries' => $gateEntries,
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('GateEntries/Create');
    }

    /**
     * Store new gate entry
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'id_number' => 'required|string|max:50',
            'entry_type' => 'required|in:visitor,supplier,staff',

            'reason' => 'required_if:entry_type,visitor|nullable|string',
            'commodities' => 'required_if:entry_type,supplier|nullable|string',
            'staff_category' => 'required_if:entry_type,staff|nullable|string',
        ]);

        GateEntry::create([
            'full_name' => $validated['full_name'],
            'phone' => $validated['phone'] ?? null,
            'id_number' => $validated['id_number'],
            'entry_type' => $validated['entry_type'],
            'reason' => $validated['reason'] ?? null,
            'commodities' => $validated['commodities'] ?? null,
            'staff_category' => $validated['staff_category'] ?? null,
            'entry_time' => now(), // 🔥 auto record entry time
        ]);

        return redirect()
            ->route('gateentries.index')
            ->with('success', 'Gate entry registered successfully.');
    }
}