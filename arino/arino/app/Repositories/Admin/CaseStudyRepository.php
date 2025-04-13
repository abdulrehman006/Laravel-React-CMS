<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\CaseStudyStoreRequest;
use App\Models\CaseStudy;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class CaseStudyRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected CaseStudy $model;

    /**
     *  Constructor for Case Study repository
     */
    public function __construct(CaseStudy $caseStudy)
    {
        $this->model = $caseStudy;
    }

    /**
     * Get services
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
                    $query->join('case_study_categories', 'case_studies.category_id', '=', 'case_study_categories.id')
                        ->orderBy('case_study_categories.title', $sort['order']);
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
     * Store case study
     */
    public function store(CaseStudyStoreRequest $request, SettingRepository $repository): void
    {
        $this->model->create([
            'title' => $request->title,
            'page_title' => $request->page_title,
            'page_sub_title' => $request->page_sub_title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category,
            'thumbnail_image' => $request->thumbnail_image,
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1": "0",
            'details' => json_encode($request->details),
            'sections' => json_encode($request->sections),
            'sections_data' => json_encode($request->sections_data),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_tags' => $request->meta_tags,
            'meta_image' => $request->meta_image,
        ]);
    }

    /**
     * Update case study
     */
    public function update(Request $request, CaseStudy $caseStudy, SettingRepository $settingRepository): void
    {
        $caseStudy->update([
            'title' => $request->title,
            'page_title' => $request->page_title,
            'page_sub_title' => $request->page_sub_title,
            'category_id' => $request->category,
            'thumbnail_image' => $request->thumbnail_image,
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1" : "0",
            'details' => json_encode($request->details),
            'sections' => json_encode($request->sections),
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
     * Delete case study
     */
    public function destroy(CaseStudy $caseStudy): void
    {
        $caseStudy->delete();
    }
}
