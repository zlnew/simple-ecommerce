<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

class StoreProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:1'],
            'category' => ['required', 'string'],
            'image' => ['required', 'dimensions:ratio=1/1', File::types(['jpeg', 'jpg', 'png'])]
        ];
    }

    public function getImagePath(): string
    {
        $path = Storage::putFile('public/img', $this->image);
        
        return Storage::url($path);
    }
}
