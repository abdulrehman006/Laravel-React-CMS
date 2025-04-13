<?php

namespace App\Repositories\Admin;

use App\Models\Category;
use App\Models\Post;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Category $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(Category $category)
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
            switch ($sort['column']) {
                case 'parent_category':
                    $query->leftJoin('categories as parent', 'categories.parent_id', '=', 'parent.id')
                        ->orderByRaw('parent.title '.$sort['order'])
                        ->select('categories.*', 'parent.title as parent_category');
                    break;
                case 'post_count':
                    $query->withCount('posts')
                        ->orderBy('posts_count', $sort['order']);
                    break;
                default:
                    $query->orderBy($sort['column'], $sort['order']);
                    break;
            }
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Create category
     */
    public function create(Request $request): void
    {
        $this->model->create($request->all());
    }

    /**
     * Category update
     *
     * @throws \Exception
     */
    public function update(Request $request, Category $category): void
    {
        if ($category->title == 'Uncategorized') {
            throw new \Exception('The category cannot be updated.');
        }
        $category->update(['title' => $request->input('title'), 'parent_id' => $request->input('parent_id')]);
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(Category $category): void
    {
        if ($category->title == 'Uncategorized') {
            throw new \Exception('The category cannot be deleted.');
        }
        // Find uncategories
        $uncategorizedCategoryId = Category::where('title', 'Uncategorized')->first()->id;

        // Find subcategories of the deleted categories
        $subcategoriesToUpdate = Category::where('parent_id', $category->id)->get();

        if ($subcategoriesToUpdate) {
            // Update the parent_id of subcategories to the "uncategorized" category ID
            $subcategoriesToUpdate->each(function ($subcategory) use ($uncategorizedCategoryId) {
                $subcategory->parent_id = $uncategorizedCategoryId;
                $subcategory->save();
            });
        }

        // Update posts assigned to the categories to the "uncategorized" category
        Post::where('category_id', $category->id)->update(['category_id' => $uncategorizedCategoryId]);
        //  Delete the categories
        $category->delete();
    }

    /**
     * Bulk category delete
     */
    public function bulkDelete($ids): void
    {
        $uncategorizedCategoryId = Category::where('title', 'Uncategorized')->first()->id;
        if ($uncategorizedCategoryId) {
            // Exclude the "uncategorized" category ID from the list
            $categoriesToDelete = array_diff(explode(',', $ids), [$uncategorizedCategoryId]);

            if (empty($categoriesToDelete)) {
                // No categories to delete (excluding "uncategorized")
                return;
            }

            // Find subcategories of the deleted categories
            $subcategoriesToUpdate = Category::whereIn('parent_id', $categoriesToDelete)->get();

            // Update the parent_id of subcategories to the "uncategorized" category ID
            $subcategoriesToUpdate->each(function ($subcategory) use ($uncategorizedCategoryId) {
                $subcategory->parent_id = $uncategorizedCategoryId;
                $subcategory->save();
            });

            // Update posts assigned to the categories to the "uncategorized" category
            Post::whereIn('category_id', $categoriesToDelete)->update(['category_id' => $uncategorizedCategoryId]);

            //  Delete the categories (excluding "uncategorized")
            Category::whereIn('id', $categoriesToDelete)->delete();
        }
    }
}
