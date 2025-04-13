<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\TestimonialStoreRequest;
use App\Http\Requests\Admin\TestimonialUpdateRequest;
use App\Models\Testimonial;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class TestimonialRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Testimonial $testimonial;

    /**
     *  Constructor for testimonial repository
     */
    public function __construct(Testimonial $testimonial)
    {
        $this->model = $testimonial;
    }

    /**
     * Get testimonial
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('name', 'like', "%$search%")
                ->orWhere('designation', 'like', "%$search%");
        }

        // sort post
        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Store testimonial
     */
    public function store(TestimonialStoreRequest $request): void
    {
        // store image
        $image_path = $request->client_image->store('testimonial');

        $this->model->create([
            'name' => $request->client_name,
            'designation' => $request->client_designation,
            'client_image' => $image_path,
            'rating_count' => $request->rating,
            'review_description' => $request->description,
        ]);
    }

    /**
     * Delete testimonial
     */
    public function destroy(Testimonial $testimonial): void
    {
        $testimonial->delete();
    }

    /**
     * Bulk testimonial delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    /**
     * Update testimonial
     */
    public function update(TestimonialUpdateRequest $request, Testimonial $testimonial): void
    {
        if (is_file($request->client_image)) {
            $image_path = $request->client_image->store('testimonial');
            $testimonial->update(['client_image' => $image_path]);
        }

        $testimonial->update([
            'name' => $request->client_name,
            'designation' => $request->client_designation,
            'rating_count' => $request->rating,
            'review_description' => $request->description,
        ]);
    }
}
