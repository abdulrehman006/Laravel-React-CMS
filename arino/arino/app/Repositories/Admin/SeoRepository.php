<?php

namespace App\Repositories\Admin;

use App\Models\CaseStudy;
use App\Models\Category;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Service;
use App\Models\Tag;
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SeoRepository
{
    public function generateSitemap()
    {
        $sitemap = Sitemap::create();

        // page sitemap
        Page::all()->each(function (Page $page) use ($sitemap){
            $sitemap->add(Url::create(route('pages.show', $page->slug))
                ->setLastModificationDate($page->updated_at));
        });

        // blog index sitemap
        $sitemap->add(Url::create(route('blog.index'))
            ->setLastModificationDate(Carbon::now()));

        // blog details sitemap
        Post::all()->each(function (Post $post) use ($sitemap) {
            $sitemap->add(Url::create(route('blog.show', $post->slug))
                ->setLastModificationDate($post->updated_at));
        });

        // category sitemap
        Category::all()->each(function (Category $category) use ($sitemap){
            $sitemap->add(Url::create(route('blog.index', ['filter' => ['category' => $category->title]]))
                ->setLastModificationDate($category->updated_at));
        });

        // tag sitemap
        $tags = Tag::whereHas('posts')->pluck('name');
        foreach ($tags as $tas){
            $sitemap->add(Url::create(route('blog.index', ['filter' => ['tag' => $tas]]))
                ->setLastModificationDate(Carbon::now()));
        }

        // portfolio sitemap
        Portfolio::all()->each(function (Portfolio $portfolio) use ($sitemap){
            $sitemap->add(Url::create(route('portfolio.show', $portfolio->slug))
                ->setLastModificationDate($portfolio->updated_at));
        });

        // service sitemap
        Service::all()->each(function (Service $service) use ($sitemap) {
            $sitemap->add(Url::create(route('service.show', $service->slug))
                ->setLastModificationDate($service->updated_at));
        });

        // case study sitemap
        CaseStudy::all()->each(function (CaseStudy $caseStudy) use ($sitemap){
            $sitemap->add(Url::create(route('case.study.show', $caseStudy->slug))
                ->setLastModificationDate($caseStudy->updated_at));
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
