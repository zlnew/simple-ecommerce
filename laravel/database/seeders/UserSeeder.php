<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'name' => 'John Doe',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'is_admin' => true
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'user@example.com',
                'password' => Hash::make('password')
            ]
        ];

        foreach ($seeds as $seed) {
            User::create($seed);
        }
    }
}
