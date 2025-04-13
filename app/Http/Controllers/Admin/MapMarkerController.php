<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MapMarker\MapMarkerStoreRequest;
use App\Http\Requests\Admin\MapMarker\MapMarkerUpdateRequest;
use App\Models\MapMarker;
use App\Repositories\Admin\MapMarkerRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
// use Inertia\Inertia;
// use Inertia\Response;

class MapMarkerController extends Controller
{
    /**
     * Get all map markers
     */
    public function index(Request $request, MapMarkerRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['mapMarkers'] = $repository->paginateSearchResult($data['search'], $data['sort']);
        return response()->json(['data'=>$data]);

        // return Inertia::render('MapMarkers/Index', $data);
    }

    /**
     * Store a new map marker
     */
    public function store(MapMarkerStoreRequest $request, MapMarkerRepository $repository)
    {
        $repository->create($request);

        return back()->with('success', 'Map Marker successfully created');
    }

    /**
     * Update a map marker
     */
    public function update(MapMarkerUpdateRequest $request, MapMarker $mapMarker, MapMarkerRepository $repository): RedirectResponse
    {
        $repository->update($mapMarker, $request);

        return back()->with('success', 'Map Marker successfully updated');
    }

    /**
     * Delete a map marker
     */
    public function destroy(MapMarker $mapMarker)
    {
        $mapMarker->delete();

        return back()->with('success', 'Map Marker successfully deleted');
    }

    /**
     * Bulk delete map markers
     */
    public function bulkDelete(Request $request, MapMarkerRepository $repository)
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected map markers successfully deleted');
    }
}
