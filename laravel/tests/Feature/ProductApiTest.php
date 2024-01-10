<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('it returns a list of products', function () {
    Product::factory(5)->create();

    $response = $this->getJson('/api/products');

    $response
        ->assertStatus(200)
        ->assertJsonCount(5, 'data')
        ->assertJsonStructure(['data' => [['id', 'name', 'price']]]);
});

test('it retrieves a specific product', function () {
    $product = Product::factory()->create();

    $response = $this->getJson("/api/products/$product->id");

    $response
        ->assertStatus(200)
        ->assertJson(['data' => $product->toArray()]);
});

test('it creates a new product', function () {
    $admin = User::factory()->create(['is_admin' => 1]);
    $this->actingAs($admin);
    
    $createdData = [
      'name' => 'Men Basic T-Shirt - SHINE',
      'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
      'price' => 95000,
      'category' => 'Mens Wear',
      'image' => UploadedFile::fake()->image('product_image.jpg', 600, 600)
    ];

    $response = $this->postJson('/api/products', $createdData);

    $response
        ->assertStatus(200)
        ->assertJson(['data' => collect($createdData)->except('image')->toArray()]);

    $this->assertDatabaseHas('products', collect($createdData)->except('image')->toArray());
});

test('it updates an existing product', function () {
    $admin = User::factory()->create(['is_admin' => 1]);
    $this->actingAs($admin);

    $product = Product::factory()->create();

    $updatedData = [
      'name' => 'Men Basic T-Shirt - SHINE',
      'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
      'price' => 95000,
      'category' => 'Mens Wear',
      'image' => UploadedFile::fake()->image('updated_product_image.jpg', 600, 600)
    ];

    $response = $this->postJson("/api/products/$product->id", $updatedData);

    $response
        ->assertStatus(200)
        ->assertJson(['data' => collect($updatedData)->except('image')->toArray()]);

    $this->assertDatabaseHas('products', collect($updatedData)->except('image')->toArray());
});

test('it deletes a product', function () {
    $admin = User::factory()->create(['is_admin' => 1]);
    $this->actingAs($admin);

    $product = Product::factory()->create();

    $response = $this->deleteJson("/api/products/$product->id");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});
