<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PortfolioStoreRequest;
use App\Http\Resources\Admin\PortfolioCategoryResource;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Repositories\Admin\PortfolioRepository;
use App\Repositories\Frontend\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Get portfolio index
     */
    public function index(Request $request, PortfolioRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = PortfolioCategory::all();
        $data['portfolios'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('Portfolios/Index', $data);
    }

    /**
     * Create portfolio
     */
    public function create(PageRepository $pageRepository): Response
    {
        $data['home_data'] = $pageRepository->getHomePageData();
        $data['categories'] = PortfolioCategoryResource::collection(PortfolioCategory::all());

        return Inertia::render('Portfolios/Create', $data);
    }

    /**
     * Store portfolio
     */
    public function store(PortfolioStoreRequest $request, PortfolioRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio successfully created');
    }

    /**
     * Edit portfolio
     */
    public function edit(Portfolio $portfolio, PortfolioRepository $repository, PageRepository $pageRepository): Response
    {
        $data['home_data'] = $pageRepository->getHomePageData();
        $data['categories'] = PortfolioCategoryResource::collection(PortfolioCategory::all());
        $data['portfolio'] = $portfolio;

        return Inertia::render('Portfolios/Edit', $data);
    }

    /**
     * Portfolio update
     */
    public function update(Request $request, Portfolio $portfolio, PortfolioRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->update($request, $portfolio, $settingRepository);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio successfully updated');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PortfolioRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected items successfully deleted');
    }

    /**
     * Portfolio delete
     */
    public function destroy(Portfolio $portfolio, PortfolioRepository $repository): RedirectResponse
    {
        $repository->destroy($portfolio);

        return back()->with('success', 'Portfolio successfully deleted');
    }
}
