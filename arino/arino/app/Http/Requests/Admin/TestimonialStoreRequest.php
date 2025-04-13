<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialStoreRequest extends FormRequest
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
        return [
            'client_name' => 'required|max:255',
            'client_designation' => 'required|max:255',
            'client_image' => 'required|image|mimes:jpeg,png,PNG,jpg,gif,svg|max:2048',
            'rating' => 'required|numeric|between:1,5',
        ];
    }
}
