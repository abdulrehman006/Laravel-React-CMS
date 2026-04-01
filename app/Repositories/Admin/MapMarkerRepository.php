<?php

namespace App\Repositories\Admin;

use App\Models\MapMarker;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;

class MapMarkerRepository
{
    use ModelRepositoryTraits;
    /**
     * Paginate and search the map markers
     */
    public function paginateSearchResult(string $search, array $sort): mixed
    {
        $sort = $this->sanitizeSort($sort, ['id', 'title', 'created_at', 'updated_at']);
        return MapMarker::where('title', 'like', "%{$search}%")
            ->orderBy($sort['column'], $sort['order'])
            ->paginate(10); // Adjust the pagination as needed
    }

    /**
     * Create a new map marker
     */
    public function create(Request $request): MapMarker
    {
        return MapMarker::create([
            'title' => $request->title,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude
        ]);
    }

    /**
     * Update an existing map marker
     */
    public function update(MapMarker $mapMarker, Request $request): bool
    {
        return $mapMarker->update([
            'title' => $request->title,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude
        ]);
    }

    /**
     * Bulk delete map markers
     */
    public function bulkDelete(Request $request): int
    {
        return MapMarker::whereIn('id', $request->ids)->delete();
    }
}
