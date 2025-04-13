<?php

namespace App\Http\Requests\Admin\Categories;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $category = $this->route('category');

        $rules = [
            'title' => 'required|max:255',
            'parent_id' => 'nullable',
        ];

        if ($category->title !== $this->input('title')) {
            $rules['title'] .= '|unique:categories,title';
        }

        return $rules;
    }
}
