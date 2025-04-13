<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TeamStoreRequest extends FormRequest
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
            'image' => 'required|image|mimes:jpeg,png,PNG,jpg,gif,svg|max:2048',
            'team_member_name' => 'required|max:255',
            'team_member_designation' => 'required|max:255',
            'facebook_url' => 'nullable|max:255|url',
            'twitter_url' => 'nullable|max:255|url',
            'instagram_url' => 'nullable|max:255|url',
            'linkedin_url' => 'nullable|max:255|url',
        ];
    }
}
