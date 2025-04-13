<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Page extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['meta_image_url'];

    /**
     * Get sections as array
     */
    public function getSectionsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get sections data as array
     */
    public function getSectionsDataAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    public function getIsShowBreadcrumbAttribute($value): bool
    {
        return $value == "1";
    }

    /**
     * Get meta image url
     *
     * @return string
     */
    public function getMetaImageUrlAttribute(): string
    {
        return asset($this->meta_image);
    }
}
