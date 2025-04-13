<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Team extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['image_url'];

    /**
     * Get image url
     */
    public function getImageUrlAttribute(): string
    {
        return Storage::url($this->image);
    }
}
