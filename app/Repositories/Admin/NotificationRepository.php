<?php

namespace App\Repositories\Admin;

use App\Models\Notification;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class NotificationRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify notification table
     */
    protected Notification $model;

    /**
     * Constructor for Notification repository
     */
    public function __construct(Notification $notification)
    {
        $this->model = $notification;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        // search pricing plan
        if (isset($search)) {
            $query->where('title', 'LIKE', "%$search%");
        }

        // sort pricing plan
        if (isset($sort['column'])) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Create notification
     */
    public function create(Request $request): void
    {
        // create plan
        $this->model->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);
    }


    /**
     * Update notification
     */
    public function update(Request $request, Notification $notification)
    {
        // update plan
        $notification->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);
    }

    /**
     * Delete notification
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();
    }

    /**
     * Bulk delete notifications
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }
}
