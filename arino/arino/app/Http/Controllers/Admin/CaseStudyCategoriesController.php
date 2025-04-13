<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CaseStudyCategoryStoreRequest;
use App\Http\Requests\Admin\CaseStudyCategoryUpdateRequest;
use App\Models\CaseStudyCategory;
use App\Repositories\Admin\CaseStudyCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyCategoriesController extends Controller
{
    public function index(Request $request, CaseStudyCategoryRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('CaseStudy/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create(): Response
    {
        return Inertia::render('CaseStudy/Categories/Create');
    }

    /**
     * Edit portfolio
     */
    public function edit(CaseStudyCategory $caseStudyCategory): Response
    {
        $data['category'] = $caseStudyCategory;

        return Inertia::render('CaseStudy/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(CaseStudyCategory $caseStudyCategory, CaseStudyCategoryUpdateRequest $request, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->update($caseStudyCategory, $request);

            return redirect()->route('admin.case.study.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }

    }

    /**
     * Store category
     */
    public function store(CaseStudyCategoryStoreRequest $request, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.case.study.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(CaseStudyCategory $caseStudyCategory, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->destroy($caseStudyCategory);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Category successfully deleted');
    }
}
