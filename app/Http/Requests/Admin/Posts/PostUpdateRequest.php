<?php

namespace App\Http\Requests\Admin\Posts;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $data['title'] = 'required|max:255';
        $data['content'] = 'required';
        $data['meta_title'] = 'nullable|max:255';
        $data['meta_description'] = 'nullable|max:255';
        if ($this->add_new_category) {
            $data['category_name'] = 'required|max:255';
        } else {
            $data['category'] = 'required|unique:categories,title';
        }
        $data['tags'] = 'nullable';
        $data['thumbnail_image'] = 'nullable|image|mimes:jpeg,png,PNG,jpg,webp|max:2048';

        return $data;
    }
}
