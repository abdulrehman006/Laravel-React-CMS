<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\PortfolioCategoryStoreRequest;
use App\Http\Requests\Admin\PortfolioCategoryUpdateRequest;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class PortfolioCategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected PortfolioCategory $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(PortfolioCategory $category)
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
        $uncategorizedCategoryId = PortfolioCategory::where('title', 'Uncategorized')->first()->id;
        if ($uncategorizedCategoryId) {
            // Exclude the "uncategorized" category ID from the list
            $categoriesToDelete = array_diff(explode(',', $request->ids), [$uncategorizedCategoryId]);

            if (empty($categoriesToDelete)) {
                // No categories to delete (excluding "uncategorized")
                return;
            }

            // Update posts assigned to the categories to the "uncategorized" category
            Portfolio::whereIn('category_id', $categoriesToDelete)->update(['category_id' => $uncategorizedCategoryId]);

            //  Delete the categories (excluding "uncategorized")
            PortfolioCategory::whereIn('id', $categoriesToDelete)->delete();
        }
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(PortfolioCategory $portfolioCategory): void
    {
        if ($portfolioCategory->title == 'Uncategorized') {
            throw new \Exception('The category cannot be deleted.');
        }

        $uncategorizedCategoryId = PortfolioCategory::where('title', 'Uncategorized')->first()->id;

        // Update posts assigned to the categories to the "uncategorized" category
        Portfolio::where('category_id', $portfolioCategory->id)->update(['category_id' => $uncategorizedCategoryId]);
        //  Delete the categories
        $portfolioCategory->delete();
    }

    /**
     * Store category
     */
    public function store(PortfolioCategoryStoreRequest $request): void
    {
        $this->model->create($request->all());
    }

    /**
     * Update category
     */
    public function update(PortfolioCategory $portfolioCategory, PortfolioCategoryUpdateRequest $request): void
    {
        if ($portfolioCategory->title == 'Uncategorized') {
            throw new \Exception('The category cannot be updated.');
        }
        $portfolioCategory->update($request->all());
    }
}
