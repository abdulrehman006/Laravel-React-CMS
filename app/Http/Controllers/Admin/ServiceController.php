<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceStoreRequest;
use App\Http\Requests\Admin\ServiceUpdateRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Repositories\Admin\ServiceRepository;
use App\Repositories\Frontend\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Paginate search result
     */
    public function index(Request $request, ServiceRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = ServiceCategory::all();
        $data['services'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('Services/Index', $data);
    }

    /**
     * Create services
     */
    public function create(PageRepository $pageRepository): Response
    {
        $data['home_data'] = $pageRepository->getHomePageData();
        $data['categories'] = CategoryResource::collection(ServiceCategory::all());

        return Inertia::render('Services/Create', $data);
    }

    /**
     * Store service
     */
    public function store(ServiceStoreRequest $request, ServiceRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return redirect()->route('admin.services.index')->with('success', 'Service successfully created');
    }

    /**
     * Edit service
     */
    public function edit(Service $service, PageRepository $pageRepository): Response
    {
        $data['home_data'] = $pageRepository->getHomePageData();
        $data['categories'] = CategoryResource::collection(ServiceCategory::all());
        $data['service'] = $service;

        return Inertia::render('Services/Edit', $data);
    }

    /**
     * Update services
     */
    public function update(ServiceUpdateRequest $request, Service $service, ServiceRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->update($request, $service, $settingRepository);

        return redirect()->route('admin.services.index')->with('success', 'Service successfully updated');
    }

    /**
     * Service destroy
     */
    public function destroy(Service $service, ServiceRepository $repository): RedirectResponse
    {
        $repository->destroy($service);

        return redirect()->route('admin.services.index')->with('success', 'Service successfully deleted');
    }

    /**
     * bulk delete
     */
    public function bulkDelete(Request $request, ServiceRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return redirect()->route('admin.services.index')->with('success', 'Selected services successfully deleted');
    }
}
