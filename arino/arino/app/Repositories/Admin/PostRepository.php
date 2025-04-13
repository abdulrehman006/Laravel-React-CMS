<?php

namespace App\Repositories\Admin;

use App\Models\Category;
use App\Models\Post;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Post $model;

    /**
     * Constructor for Post repository
     */
    public function __construct(Post $post)
    {
        $this->model = $post;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        // search post
        if ($search) {
            $query->orWhere('title', 'like', "%$search%")
                ->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%$search%");
                })
                ->orWhereHas('category', function ($categoryQuery) use ($search) {
                    $categoryQuery->where('title', 'like', "%$search%");
                });
        }

        // Filter post by category name
        if (isset($filter['category']) && $filter['category'] != 'All Categories') {
            $query->whereHas('category', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // Filter post by status
        if (isset($filter['status']) && $filter['status'] != 'All Status') {
            $statusNo = $filter['status'] == 'Published' ? '1' : '0';
            $query->where('status', $statusNo);
        }

        // sort post
        if (isset($sort['column'])) {
            switch ($sort['column']) {
                case 'published_by':
                    $query->join('users', 'posts.user_id', '=', 'users.id')
                        ->orderBy('users.name', $sort['order']);
                    break;
                case 'category':
                    $query->join('categories', 'posts.category_id', '=', 'categories.id')
                        ->orderBy('categories.title', $sort['order'])
                        ->selectRaw('posts.*, categories.title as category_title');
                    break;
                case 'comment_count':
                    $query->leftJoin('comments', 'posts.id', '=', 'comments.post_id')
                        ->select('posts.*', DB::raw('COUNT(comments.id) as comment_count'))
                        ->groupBy('posts.id')
                        ->orderBy('comment_count', $sort['order']);
                    break;
                default:
                    $query->orderBy($sort['column'], $sort['order']);
                    break;
            }
        } else {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Create post
     */
    public function create(Request $request): void
    {
        // store image
        $imagePath = $request->file('thumbnail_image')->store('posts');
        $category = $request->input('category');
        $slug = Str::slug($request->input('title'));
        // create new category
        if ($request->add_new_category) {
            $category = Category::create(['title' => $request->input('title')])->id;
        }

        // create post
        $post = $this->model->create([
            'slug' => $slug,
            'user_id' => Auth::id(),
            'category_id' => $category,
            'thumbnail_image' => $imagePath,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'status' => $request->input('status'),
            'meta_title' => $request->input('meta_title'),
            'meta_description' => $request->input('meta_description'),
        ]);

        // assign tags
        if ($request->tags) {
            $post->attachTags($request->tags);
        }
    }

    /**
     * Update post
     */
    public function update(Request $request, Post $post): void
    {
        $category = $request->input('category');
        // create new category
        if ($request->add_new_category) {
            $category = Category::create(['title' => $request->input('title')])->id;
        }

        // update post image
        if (is_file($request->thumbnail_image)) {
            $imagePath = $request->file('thumbnail_image')->store('posts');
            $post->update(['thumbnail_image' => $imagePath]);
        }

        // update post data
        $post->update([
            'category_id' => $category,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'status' => $request->input('status'),
            'meta_title' => $request->input('meta_title'),
            'meta_description' => $request->input('meta_description'),
        ]);

        // Detach all existing tags
        $post->detachTags($post->tags);

        // attach tags
        $post->attachTags($request->tags);
    }

    /**
     * Delete post
     */
    public function destroy(Post $post): void
    {
        $post->delete();
    }

    /**
     * Bulk delete posts
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }

    /**
     * Bulk publish posts
     */
    public function bulkPublish($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->whereIn('id', $idArray)->update(['status' => '1']);
    }

    /**
     * Bulk un-publish posts
     */
    public function bulkUnPublish($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->whereIn('id', $idArray)->update(['status' => '0']);
    }

    /**
     * Toggle post status
     */
    public function statusToggle($postId): void
    {
        $post = $this->model->find($postId);
        $newStatus = $post->status == '1' ? '0' : '1';
        $post->status = $newStatus;
        $post->save();
    }
}
