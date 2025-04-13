<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CaseStudyStoreRequest;
use App\Http\Requests\Admin\CaseStudyUpdateRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\CaseStudy;
use App\Models\CaseStudyCategory;
use App\Repositories\Admin\CaseStudyRepository;
use App\Repositories\Frontend\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyController extends Controller
{
    public function index(Request $request, CaseStudyRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = CaseStudyCategory::all();
        $data['case_studies'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('CaseStudy/Index', $data);
    }

    /**
     * Create services
     */
    public function create(PageRepository $pageRepository): Response
    {
        $data['home_data'] = $pageRepository->getHomePageData();
        $data['categories'] = CategoryResource::collection(CaseStudyCategory::all());

        return Inertia::render('CaseStudy/Create', $data);
    }

    /**
     * Store case study
     */
    public function store(CaseStudyStoreRequest $request, CaseStudyRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return redirect()->route('admin.case.study.index')->with('success', 'Case study successfully created');
    }

    /**
     * Edit case study
     */
    public function edit(CaseStudy $caseStudy, PageRepository $pageRepository): Response
    {
        $data['home_data'] = $pageRepository->getHomePageData();
        $data['categories'] = CategoryResource::collection(CaseStudyCategory::all());
        $data['caseStudy'] = $caseStudy;

        return Inertia::render('CaseStudy/Edit', $data);
    }

    /**
     * Update case study
     */
    public function update(CaseStudyUpdateRequest $request, CaseStudy $caseStudy, CaseStudyRepository $caseStudyRepository, SettingRepository $settingRepository): RedirectResponse
    {
        $caseStudyRepository->update($request, $caseStudy, $settingRepository);

        return redirect()->route('admin.case.study.index')->with('success', 'Case study successfully updated');
    }

    /**
     * Bulk delete case study
     */
    public function bulkDelete(Request $request, CaseStudyRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected case study successfully deleted');
    }

    public function destroy(CaseStudy $caseStudy, CaseStudyRepository $repository): RedirectResponse
    {
        $repository->destroy($caseStudy);

        return back()->with('success', 'Case study successfully deleted');
    }
}
