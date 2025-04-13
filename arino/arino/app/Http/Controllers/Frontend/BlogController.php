<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\PostCommentRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Repositories\Frontend\BlogRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request, BlogRepository $repository)
    {
        $data['categories'] = Category::withCount('posts')
            ->having('posts_count', '>', 0)
            ->get();
        $data['tags'] = Tag::whereHas('posts')->pluck('name');
        $data['filter']['category'] = $request->filter['category'] ?? '';
        $data['filter']['tag'] = $request->filter['tag'] ?? '';
        $data['filter']['author'] = $request->filter['author'] ?? '';
        $data['recent_post'] = Post::where('status', '1')->latest()->take(4)->get();
        $data['search'] = $request->search ?? '';
        $data['posts'] = $repository->paginateSearchResult($data['search'], $data['filter']);

        return Inertia::render('Blogs/Index', $data);
    }

    public function show($slug, BlogRepository $repository)
    {
        $data['categories'] = Category::withCount('posts')
            ->having('posts_count', '>', 0)
            ->get();
        $data['recent_post'] = Post::where('status', '1')->latest()->take(4)->get();
        $data['tags'] = Tag::whereHas('posts')->pluck('name');
        $data['blog'] = $repository->show($slug);

        return Inertia::render('Blogs/BlogDetails', $data);
    }

    public function comment(PostCommentRequest $request, BlogRepository $repository)
    {
        $repository->storeComment($request);

        return back();
    }
}
