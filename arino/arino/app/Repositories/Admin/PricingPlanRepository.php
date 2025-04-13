<?php

namespace App\Repositories\Admin;

use App\Models\PricingPlan;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class PricingPlanRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify pricingPlan table
     */
    protected PricingPlan $model;

    /**
     * Constructor for PricingPlan repository
     */
    public function __construct(PricingPlan $pricingPlan)
    {
        $this->model = $pricingPlan;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('currency')->newQuery();

        // search pricing plan
        if (isset($search)) {
            $query->where('name', 'LIKE', "%$search%");
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
     * Create pricingPlan
     */
    public function create(Request $request): void
    {
        // create plan
        $this->model->create([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'currency_id' => $request->input('select_currency'),
            'plan' => $request->input('plan'),
            'plan_details' => json_encode($request->plan_details),
        ]);
    }


    /**
     * Update pricingPlan
     */
    public function update(Request $request, PricingPlan $pricingPlan)
    {
        // update plan
        $pricingPlan->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'currency_id' => $request->input('select_currency'),
            'plan' => $request->input('plan'),
            'plan_details' => json_encode($request->plan_details),
        ]);
    }

    /**
     * Delete pricingPlan
     */
    public function destroy(PricingPlan $pricingPlan)
    {
        $pricingPlan->delete();
    }

    /**
     * Bulk delete pricingPlans
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }
}
