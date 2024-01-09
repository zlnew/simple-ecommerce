<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    protected $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function index(Request $request)
    {
        $productQuery = $this->product->query();

        if ($request->search) {
            $productQuery->where('name', 'LIKE', '%'.$request->search.'%');
        }

        if ($request->category) {
            $productQuery->where('category', $request->category);
        }

        $product = $productQuery->get();

        return new ProductResource($product);
    }

    public function store(StoreProductRequest $request)
    {
        $validated = $request->safe();
        $imagePath = $request->getImagePath();

        $product = $this->product->fill([
            'name' => $validated->name,
            'description' => $validated->description,
            'price' => $validated->price,
            'category' => $validated->category,
            'image' => $imagePath
        ]);

        $product->save();

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->safe();
        $imagePath = $request->getImagePath($product->id);

        $product->fill([
            'name' => $validated->name,
            'description' => $validated->description,
            'price' => $validated->price,
            'category' => $validated->category,
            'image' => $imagePath
        ]);

        $product->save();

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $imagePath = str_replace('/storage', '/public', $product->image);

        Storage::delete($imagePath);

        $product->delete();

        return response()->noContent();
    }
}
