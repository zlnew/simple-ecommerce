<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'name' => 'Men Basic T-Shirt - SHINE',
                'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
                'price' => 95000,
                'category' => 'Mens Wear',
                'image' => '/storage/img/tshirt_1.jpg'
            ],
            [
                'name' => 'Men Basic T-Shirt - Unknown',
                'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
                'price' => 95000,
                'category' => 'Mens Wear',
                'image' => '/storage/img/tshirt_2.jpg'
            ],
            [
                'name' => 'Women Basic T-Shirt - MAKE ART',
                'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
                'price' => 95000,
                'category' => 'Womens Wear',
                'image' => '/storage/img/tshirt_3.jpg'
            ],
            [
                'name' => 'Women Basic T-Shirt - RETRO',
                'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
                'price' => 95000,
                'category' => 'Womens Wear',
                'image' => '/storage/img/tshirt_4.jpg'
            ]
        ];

        foreach ($seeds as $seed) {
            Product::create($seed);
        }
    }
}
