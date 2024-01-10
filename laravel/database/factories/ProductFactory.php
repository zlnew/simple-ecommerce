<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
            'price' => 90000,
            'category' => Str::random(10),
            'image' => Str::random(10)
        ];
    }
}
