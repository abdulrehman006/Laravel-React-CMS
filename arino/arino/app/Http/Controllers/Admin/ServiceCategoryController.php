<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceCategoryStoreRequest;
use App\Http\Requests\Admin\ServiceCategoryUpdateRequest;
use App\Models\ServiceCategory;
use App\Repositories\Admin\ServiceCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCategoryController extends Controller
{
    public function index(Request $request, ServiceCategoryRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Services/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create(): Response
    {
        return Inertia::render('Services/Categories/Create');
    }

    /**
     * Edit portfolio
     */
    public function edit(ServiceCategory $serviceCategory): Response
    {
        $data['category'] = $serviceCategory;

        return Inertia::render('Services/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(ServiceCategory $serviceCategory, ServiceCategoryUpdateRequest $request, ServiceCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->update($serviceCategory, $request);

            return redirect()->route('admin.services.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }

    }

    /**
     * Store category
     */
    public function store(ServiceCategoryStoreRequest $request, ServiceCategoryRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.services.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(ServiceCategory $serviceCategory, ServiceCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->destroy($serviceCategory);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, ServiceCategoryRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Category successfully deleted');
    }
}
