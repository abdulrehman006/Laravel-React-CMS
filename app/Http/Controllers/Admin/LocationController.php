<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Location::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // Sort functionality — whitelist to prevent SQL injection
        $allowedSortFields = ['id', 'name', 'city', 'country', 'phone', 'is_active', 'sort_order', 'created_at', 'updated_at'];
        $sortField = in_array($request->get('sort_field'), $allowedSortFields) ? $request->get('sort_field') : 'sort_order';
        $sortDirection = in_array(strtolower($request->get('sort_direction', '')), ['asc', 'desc']) ? $request->get('sort_direction') : 'asc';
        $query->orderBy($sortField, $sortDirection);

        $locations = $query->paginate(10)->appends($request->all());

        return Inertia::render('Locations/Index', [
            'locations' => $locations,
            'filters' => $request->only(['search', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Locations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'url' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'description' => 'nullable|string|max:2000',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];

        // Only validate image if a file was actually uploaded
        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif,webp|max:2048';
        }

        $validated = $request->validate($rules);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('locations');
        } else {
            unset($validated['image']);
        }

        try {
            Location::create($validated);
        } catch (\Exception $e) {
            Log::error('Location creation failed: ' . $e->getMessage());
            return redirect()->back()->withErrors(['name' => 'Failed to create location. Please check your input and try again.'])->withInput();
        }

        return redirect()->route('admin.locations.index')
            ->with('success', 'Location created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        return Inertia::render('Locations/Show', [
            'location' => $location,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        return Inertia::render('Locations/Edit', [
            'location' => $location,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        $rules = [
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'url' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'description' => 'nullable|string|max:2000',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];

        // Only validate image if a file was actually uploaded
        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif,webp|max:2048';
        }

        $validated = $request->validate($rules);

        // Handle image upload — delete old image if new one uploaded
        if ($request->hasFile('image')) {
            if ($location->image) {
                Storage::delete($location->image);
            }
            $validated['image'] = $request->file('image')->store('locations');
        } else {
            unset($validated['image']); // Keep existing image
        }

        try {
            $location->update($validated);
        } catch (\Exception $e) {
            Log::error('Location update failed: ' . $e->getMessage());
            return redirect()->back()->withErrors(['name' => 'Failed to update location. Please check your input and try again.'])->withInput();
        }

        return redirect()->route('admin.locations.index')
            ->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        if ($location->image) {
            Storage::delete($location->image);
        }
        $location->delete();

        return redirect()->route('admin.locations.index')
            ->with('success', 'Location deleted successfully.');
    }

    /**
     * Bulk delete locations.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:locations,id',
        ]);

        // Delete associated images before removing locations
        $locations = Location::whereIn('id', $request->ids)->get();
        foreach ($locations as $loc) {
            if ($loc->image) {
                Storage::delete($loc->image);
            }
        }
        Location::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.locations.index')
            ->with('success', 'Locations deleted successfully.');
    }
}
