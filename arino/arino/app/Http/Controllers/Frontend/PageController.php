<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Repositories\Frontend\PageRepository;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home(PageRepository $repository)
    {
        $data['home_data'] = $repository->getHomePageData();

        return Inertia::render('Welcome', $data);
    }

    public function show($slug)
    {
        $page = Page::where('slug', $slug)->first();
        if ($page) {
            switch ($page->slug) {
                case 'about':
                    $data['about'] = $page;

                    return Inertia::render('Page/AboutPage', $data);
                case 'faq':
                    $data['faq'] = $page;

                    return Inertia::render('Page/FaqPage', $data);
                case 'contact':
                    $data['contact'] = $page;

                    return Inertia::render('Page/ContactPage', $data);
                default:
                    $data['page'] = $page;

                    return Inertia::render('Page/Page', $data);
            }
        }
        abort(404);
    }
}
