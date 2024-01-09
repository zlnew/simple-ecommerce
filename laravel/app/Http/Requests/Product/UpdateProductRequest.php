<?php

namespace App\Http\Requests\Product;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

class UpdateProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:1'],
            'category' => ['required', 'string'],
            'image' => ['nullable', 'dimensions:ratio=1/1', File::types(['jpeg', 'jpg', 'png'])]
        ];
    }

    public function getImagePath(int $productID): string
    {
        $product = Product::find($productID);

        if ($this->image !== null) {
            $oldImagePath = str_replace('/storage', '/public', $product->image);
            
            Storage::delete($oldImagePath);

            $newImagePath = Storage::putFile('public/img', $this->image);

            return Storage::url($newImagePath);
        }

        return $product->image;
    }
}
