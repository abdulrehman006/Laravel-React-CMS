<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Repositories\Admin\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Get pages
     */
    public function index(Request $request, PageRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['pages'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Pages/Index', $data);
    }

    public function create()
    {
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();

        return Inertia::render('Pages/Create', $data);
    }

    /**
     * Store page
     */
    public function store(Request $request, PageRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $request->validate([
            'title' => 'required|max:256',
        ]);
        $repository->store($request, $settingRepository);

        return redirect()->route('admin.pages.index')->with('success', 'Page successfully created');
    }

    /**
     * Edit page
     *
     * @return Response|void
     */
    public function edit(Page $page)
    {
        switch ($page->slug) {
            case '/':
                return $this->homePageEdit($page);
            case 'about':
                return $this->aboutPageEdit($page);
            case 'faq':
                return $this->faqPageEdit($page);
            case 'contact':
                return $this->contactPageEdit($page);
            default:
                return $this->editPage($page);
        }
    }

    private function editPage(Page $page): Response
    {
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();
        $data['page'] = $page;

        return Inertia::render('Pages/Edit', $data);
    }

    /**
     * Home page edit
     */
    public function homePageEdit(Page $page): Response
    {
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();
        $data['home'] = $page;

        return Inertia::render('Pages/HomeEdit', $data);
    }

    /**
     * About page edit
     */
    public function aboutPageEdit(Page $page): Response
    {
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();
        $data['about'] = $page;

        return Inertia::render('Pages/AboutEdit', $data);
    }

    /**
     * Faq edit
     */
    public function faqPageEdit(Page $page): Response
    {
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();
        $data['faq'] = $page;

        return Inertia::render('Pages/FaqEdit', $data);
    }

    /**
     * Contact page edit
     */
    public function contactPageEdit(Page $page): Response
    {
        $repository = new \App\Repositories\Frontend\PageRepository;
        $data['home_data'] = $repository->getHomePageData();
        $data['contact'] = $page;

        return Inertia::render('Pages/ContactEdit', $data);
    }

    /**
     * Update page
     *
     * @return RedirectResponse|void
     */
    public function update(Request $request, Page $page, PageRepository $repository, SettingRepository $settingRepository)
    {
        // validate form
        if ($page->type == 'custom') {
            return $this->updateCustomPage($request, $page, $repository, $settingRepository);
        } else {
            $request->validate([
                'title' => 'required|max:256',
            ]);

            return $this->updatePage($request, $page, $repository, $settingRepository);
        }
    }

    /**
     * Delete page
     */
    public function destroy(Page $page): RedirectResponse
    {
        if ($page->type == 'custom') {
            return back()->with('error', 'This page is not deletable');
        }
        $page->delete();

        return back()->with('success', 'Page successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PageRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected items successfully deleted');
    }

    /**
     * Update custom page
     */
    public function updateCustomPage(Request $request, Page $page, PageRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        if ($page->slug != '/') {
            $request->validate([
                'title' => 'required|max:256',
            ]);
        }
        $repository->updateCustomPage($request, $page, $settingRepository);
        return redirect()->route('admin.pages.index')->with('success', 'Successfully page updated');
    }

    /**
     * Update pages
     */
    public function updatePage(Request $request, Page $page, PageRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->updatePage($request, $page, $settingRepository);
        return redirect()->route('admin.pages.index')->with('success', 'Successfully page updated');
    }

    /**
     * Upload file
     */
    public function uploadFile(Request $request, PageRepository $repository): string
    {
        return $repository->uploadFile($request);
    }
}
