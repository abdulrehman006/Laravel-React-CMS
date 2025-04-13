<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['client_image_url'];

    /**
     * Get client image url
     */
    public function getClientImageUrlAttribute(): string
    {
        return Storage::url($this->client_image);
    }
}
