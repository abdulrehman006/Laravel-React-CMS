<?php

namespace App\Repositories\Frontend;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class BlogRepository
{
    protected Post $model;

    public function __construct(Post $post)
    {
        $this->model = $post;
    }

    public function paginateSearchResult($search, array $filter = [])
    {
        $query = $this->model->newQuery();

        if (! empty($search)) {
            $query->orWhere('title', 'LIKE', '%'.$search.'%')
                ->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'LIKE', "%$search%");
                })
                ->orWhereHas('category', function ($categoryQuery) use ($search) {
                    $categoryQuery->where('title', 'LIKE', "%$search%");
                })
                ->orWhereHas('tags', function ($tagQuery) use ($search) {
                    $tagQuery->where('name', 'LIKE', "%$search%");
                });
        }

        if (! empty($filter['category'])) {
            $query->whereHas('category', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        if (! empty($filter['tag'])) {
            $query->withAnyTags([$filter['tag']]);
        }

        // Check if the 'author' filter is provided
        if (!empty($filter['author'])) {
            $query->whereHas('user', function ($userQuery) use ($filter) {
                $userQuery->where('id', $filter['author']);
            });
        }

        return $query->where('status', '1')->paginate(5);
    }

    /**
     * Show blog post
     */
    public function show($slug): mixed
    {
        $post = $this->model->where('slug', $slug)->first();
        if (! $post) {
            abort(404);
        }

        return $post;
    }

    /**
     * Post comment store
     */
    public function storeComment(Request $request): void
    {
        Comment::create([
            'post_id' => $request->post_id,
            'comment_parent' => $request->comment_parent,
            'comment_content' => $request->comment,
            'comment_author_website' => $request->website,
            'comment_author_email' => $request->email,
            'comment_author_name' => $request->full_name,
        ]);
    }
}
