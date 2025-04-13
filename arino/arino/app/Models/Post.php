<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory, HasTags;

    protected $fillable = [
        'title',
        'slug',
        'user_id',
        'category_id',
        'tags',
        'thumbnail_image',
        'content',
        'status',
        'meta_title',
        'meta_description',
    ];

    /**
     * Get post category
     */
    public function category(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    /**
     * Get post comments
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * get comments count
     */
    public function getCommentCount(): string
    {
        return $this->comments->where('is_approved', 1)->count() ? $this->comments->count().' Comments' : 'No Comments';
    }

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * get thumbnail url
     */
    public function getThumbnailImageUrlAttribute(): string
    {
        return asset(Storage::url($this->thumbnail_image));
    }

    /**
     * Get array of post object
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'user_name' => $this->user->name,
            'user' => $this->user,
            'user_id' => $this->user->id,
            'category_id' => $this->category_id,
            'category_name' => $this->category->title,
            'tags' => $this->tags?->pluck('name'),
            'thumbnail_image' => $this->thumbnail_image,
            'thumbnail_image_url' => $this->thumbnail_image_url,
            'title' => $this->title,
            'content' => $this->content,
            'status' => $this->status,
            'meta_title' => $this->meta_title,
            'comments' => $this->comments->where('is_approved', 1)->values()->all(),
            'comment_count' => $this->comments->where('is_approved', 1)->count(),
            'comment_count_string' => $this->getCommentCount(),
            'meta_description' => $this->meta_description,
            'created_at' => $this->created_at,
        ];
    }
}
