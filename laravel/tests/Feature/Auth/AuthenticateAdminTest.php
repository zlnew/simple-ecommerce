<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;

test('admin can access admin-only route', function () {
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
  $response->assertStatus(200);
});

test('non-admin cannot access admin-only route', function () {
  $user = User::factory()->create();
  $this->actingAs($user);

  $createdData = [
    'name' => 'Men Basic T-Shirt - SHINE',
    'description' => "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions.",
    'price' => 95000,
    'category' => 'Mens Wear',
    'image' => UploadedFile::fake()->image('product_image.jpg', 600, 600)
  ];

  $response = $this->postJson('/api/products', $createdData);
  $response->assertStatus(403);
});
