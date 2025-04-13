<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CaseStudy extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $appends = ['meta_image_url'];

    /**
     * Get category
     */
    public function category(): HasOne
    {
        return $this->hasOne(CaseStudyCategory::class, 'id', 'category_id');
    }

    /**
     * Get details as object
     */
    public function getDetailsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get section as array
     */
    public function getSectionsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    public function getIsShowBreadcrumbAttribute($value): bool
    {
        return $value == "1";
    }

    /**
     * Get sections data as object
     *
     * @param $value
     * @return mixed
     */
    public function getSectionsDataAttribute($value): mixed
    {
        return json_decode($value, true);
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
