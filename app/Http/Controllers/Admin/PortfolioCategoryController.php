<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PortfolioCategoryStoreRequest;
use App\Http\Requests\Admin\PortfolioCategoryUpdateRequest;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Repositories\Admin\PortfolioCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioCategoryController extends Controller
{
    public function index(Request $request, PortfolioCategoryRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Portfolios/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create(): Response
    {
        return Inertia::render('Portfolios/Categories/Create');
    }

    /**
     * Edit portfolio
     */
    public function edit(PortfolioCategory $portfolioCategory): Response
    {
        $data['category'] = $portfolioCategory;

        return Inertia::render('Portfolios/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(PortfolioCategory $portfolioCategory, PortfolioCategoryUpdateRequest $request, PortfolioCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->update($portfolioCategory, $request);

            return redirect()->route('admin.portfolios.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }

    }

    /**
     * Store category
     */
    public function store(PortfolioCategoryStoreRequest $request, PortfolioCategoryRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.portfolios.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(PortfolioCategory $portfolioCategory, PortfolioCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->destroy($portfolioCategory);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PortfolioCategoryRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Category successfully deleted');
    }
}
