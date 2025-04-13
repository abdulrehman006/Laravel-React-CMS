<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\ServiceCategoryStoreRequest;
use App\Http\Requests\Admin\ServiceCategoryUpdateRequest;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ServiceCategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected ServiceCategory $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(ServiceCategory $category)
    {
        $this->model = $category;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        // search category
        if (isset($search)) {
            $query->where('title', 'LIKE', "%$search%");
        }

        // sort category
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
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $uncategorizedCategoryId = ServiceCategory::where('title', 'Uncategorized')->first()->id;
        if ($uncategorizedCategoryId) {
            // Exclude the "uncategorized" category ID from the list
            $categoriesToDelete = array_diff(explode(',', $request->ids), [$uncategorizedCategoryId]);

            if (empty($categoriesToDelete)) {
                // No categories to delete (excluding "uncategorized")
                return;
            }

            // Update posts assigned to the categories to the "uncategorized" category
            Service::whereIn('category_id', $categoriesToDelete)->update(['category_id' => $uncategorizedCategoryId]);

            //  Delete the categories (excluding "uncategorized")
            ServiceCategory::whereIn('id', $categoriesToDelete)->delete();
        }
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(ServiceCategory $serviceCategory): void
    {
        if ($serviceCategory->title == 'Uncategorized') {
            throw new \Exception('The category cannot be deleted.');
        }

        $uncategorizedCategoryId = ServiceCategory::where('title', 'Uncategorized')->first()?->id;

        // Update posts assigned to the categories to the "uncategorized" category
        Service::where('category_id', $serviceCategory->id)->update(['category_id' => $uncategorizedCategoryId]);
        //  Delete the categories
        $serviceCategory->delete();
    }

    /**
     * Store category
     */
    public function store(ServiceCategoryStoreRequest $request): void
    {
        $this->model->create($request->all());
    }

    /**
     * Update category
     *
     * @throws \Exception
     */
    public function update(ServiceCategory $serviceCategory, ServiceCategoryUpdateRequest $request): void
    {
        if ($serviceCategory->title == 'Uncategorized') {
            throw new \Exception('The category cannot be updated.');
        }
        $serviceCategory->update($request->all());
    }
}
