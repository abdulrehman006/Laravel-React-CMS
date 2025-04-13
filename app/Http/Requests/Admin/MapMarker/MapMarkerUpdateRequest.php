<?php

namespace App\Http\Requests\Admin\MapMarker;

use Illuminate\Foundation\Http\FormRequest;

class MapMarkerUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust this according to your authorization needs
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'nullable|string|max:1000',
        ];
    }
}
