<?php

namespace App\Repositories\Admin;

use App\Models\Page;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PageRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Page $model;

    /**
     * Constructor for Page repository
     */
    public function __construct(Page $page)
    {
        $this->model = $page;
    }

    /**
     * Get pages
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('title', 'like', "%$search%");
        }

        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Update custom page
     */
    public function updateCustomPage(Request $request, Page $page, SettingRepository $settingRepository): void
    {
        if ($page->slug == '/'){
            $page->update([
                'title' => $request->title ?? $page->title,
                'sections' => json_encode($request->sections),
            ]);
            // update theme related data
            $settingRepository->storeThemeData($request->layouts_data);
        } else{
            $page->update([
                'title' => $request->title ?? $page->title,
                'sections' => json_encode($request->sections),
                'sections_data' => json_encode($request->sections_data),
                'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1": "0",
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'meta_tags' => $request->meta_tags,
                'meta_image' => $request->meta_image,
            ]);
        }
    }

    /**
     * Update pages
     */
    public function updatePage(Request $request, Page $page, SettingRepository $settingRepository): void
    {
        $page->update([
            'title' => $request->title,
            'content' => $request->description,
            'sections' => json_encode($request->sections),
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1": "0",
            'sections_data' => json_encode($request->sections_data),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_tags' => $request->meta_tags,
            'meta_image' => $request->meta_image,
        ]);
    }

    /**
     * Upload file
     */
    public function uploadFile(Request $request): string
    {
        return Storage::url($request->file('file')->store('pages'));
    }

    /**
     * Store page
     */
    public function store(Request $request, SettingRepository $settingRepository): void
    {
        $this->model->create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->description,
            'type' => 'regular',
            'sections' => json_encode($request->sections),
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1": "0",
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
        $ids = explode(',', $request->ids);
        $this->model->whereIn('id', $ids)->where('type', '!=', 'custom')->delete();
    }
}
