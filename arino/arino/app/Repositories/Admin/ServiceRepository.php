<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\ServiceStoreRequest;
use App\Models\Service;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class ServiceRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Service $model;

    /**
     *  Constructor for Service repository
     */
    public function __construct(Service $service)
    {
        $this->model = $service;
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
                    $query->join('service_categories', 'services.category_id', '=', 'service_categories.id')
                        ->orderBy('service_categories.title', $sort['order']);
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
     * Store service
     */
    public function store(ServiceStoreRequest $request, SettingRepository $repository): void
    {
        $this->model->create([
            'title' => $request->title,
            'icon_box_title' => $request->icon_box_title,
            'icon_box_sub_title' => $request->icon_box_sub_title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category,
            'icon_box' => json_encode($request->icon_box),
            'info_thumbnail_image' => $request->info_thumbnail_image,
            'info_title' => $request->info_title,
            'info_list' => json_encode($request->info_list),
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1" : "0",
            'sections' => json_encode($request->sections),
            'sections_data' => json_encode($request->sections_data),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_tags' => $request->meta_tags,
            'meta_image' => $request->meta_image,
        ]);
    }

    /**
     * Update service
     */
    public function update(Request $request, Service $service, SettingRepository $repository): void
    {
        $service->update([
            'title' => $request->title,
            'icon_box_title' => $request->icon_box_title,
            'icon_box_sub_title' => $request->icon_box_sub_title,
            'category_id' => $request->category,
            'icon_box' => json_encode($request->icon_box),
            'info_thumbnail_image' => $request->info_thumbnail_image,
            'info_title' => $request->info_title,
            'info_list' => json_encode($request->info_list),
            'is_show_breadcrumb' => $request->is_show_breadcrumb ? "1" : "0",
            'sections' => json_encode($request->sections),
            'sections_data' => json_encode($request->sections_data),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'meta_tags' => $request->meta_tags,
            'meta_image' => $request->meta_image,
        ]);
    }

    /**
     * Service delete
     */
    public function destroy(Service $service): void
    {
        $service->delete();
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }
}
