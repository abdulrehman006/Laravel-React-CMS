<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\PortfolioStoreRequest;
use App\Models\Portfolio;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class PortfolioRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Portfolio $model;

    /**
     *  Constructor for Portfolio repository
     */
    public function __construct(Portfolio $portfolio)
    {
        $this->model = $portfolio;
    }

    /**
     * Get portfolios
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->with('category')->newQuery();

        if ($search) {
            $query->orWhere('title', 'like', "%$search%");
        }

        // Filter post by category name
        if (isset($filter['category']) && $filter['category'] != 'All Categories') {
            $query->whereHas('category', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // sort post
        if (isset($sort['column'])) {
            switch ($sort['column']) {
                case 'category':
                    $query->join('portfolio_categories', 'portfolios.category_id', '=', 'portfolio_categories.id')
                        ->orderBy('portfolio_categories.title', $sort['order']);
                    break;
                default:
                    $query->orderBy($sort['column'], $sort['order']);
                    break;
            }
        } else {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Store portfolio
     *
     * @return void
     */
    public function store(PortfolioStoreRequest $request, SettingRepository $settingRepository)
    {
        $this->model->create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'sub_title' => $request->sub_title,
            'content' => $request->details,
            'category_id' => $request->category,
            'thumbnail_image' => $request->thumbnail_image,
            'project_info_text' => $request->project_info_text,
            'sections' => json_encode($request->sections),
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1": "0",
            'project_info' => json_encode($request->projectInfo),
            'sections_data' => json_encode($request->sections_data),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_tags' => $request->meta_tags,
            'meta_image' => $request->meta_image,
        ]);
    }

    /**
     * Portfolio update
     */
    public function update(Request $request, Portfolio $portfolio, SettingRepository $settingRepository): void
    {
        $portfolio->update([
            'title' => $request->title,
            'sub_title' => $request->sub_title,
            'content' => $request->details,
            'category_id' => $request->category,
            'thumbnail_image' => $request->thumbnail_image,
            'project_info_text' => $request->project_info_text,
            'sections' => json_encode($request->sections),
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1": "0",
            'project_info' => json_encode($request->projectInfo),
            'sections_data' => json_encode($request->sections_data),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_tags' => $request->meta_tags,
            'meta_image' => $request->meta_image,
        ]);
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    /**
     * Delete portfolio
     */
    public function destroy(Portfolio $portfolio): void
    {
        $portfolio->delete();
    }
}
