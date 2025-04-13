<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\CaseStudyCategoryStoreRequest;
use App\Http\Requests\Admin\CaseStudyCategoryUpdateRequest;
use App\Models\CaseStudy;
use App\Models\CaseStudyCategory;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CaseStudyCategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected CaseStudyCategory $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(CaseStudyCategory $category)
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
        $uncategorizedCategoryId = CaseStudyCategory::where('title', 'Uncategorized')->first()->id;
        if ($uncategorizedCategoryId) {
            // Exclude the "uncategorized" category ID from the list
            $categoriesToDelete = array_diff(explode(',', $request->ids), [$uncategorizedCategoryId]);

            if (empty($categoriesToDelete)) {
                // No categories to delete (excluding "uncategorized")
                return;
            }

            // Update posts assigned to the categories to the "uncategorized" category
            CaseStudy::whereIn('category_id', $categoriesToDelete)->update(['category_id' => $uncategorizedCategoryId]);

            //  Delete the categories (excluding "uncategorized")
            CaseStudyCategory::whereIn('id', $categoriesToDelete)->delete();
        }
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(CaseStudyCategory $caseStudyCategory): void
    {
        if ($caseStudyCategory->title == 'Uncategorized') {
            throw new \Exception('The category cannot be deleted.');
        }

        $uncategorizedCategoryId = CaseStudyCategory::where('title', 'Uncategorized')->first()?->id;

        // Update posts assigned to the categories to the "uncategorized" category
        CaseStudy::where('category_id', $caseStudyCategory->id)->update(['category_id' => $uncategorizedCategoryId]);
        //  Delete the categories
        $caseStudyCategory->delete();
    }

    /**
     * Store category
     */
    public function store(CaseStudyCategoryStoreRequest $request): void
    {
        $this->model->create($request->all());
    }

    /**
     * Update category
     *
     * @throws \Exception
     */
    public function update(CaseStudyCategory $caseStudyCategory, CaseStudyCategoryUpdateRequest $request): void
    {
        if ($caseStudyCategory->title == 'Uncategorized') {
            throw new \Exception('The category cannot be updated.');
        }
        $caseStudyCategory->update($request->all());
    }
}
