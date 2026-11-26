<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'user_name', 'user_id', 'email', 'password', 'phone_number',
        'profile_picture', 'account_type', 'authorization_type',
    ];

    protected $hidden = ['password'];

    protected function casts(): array
    {
        return ['password' => 'hashed']; // auto-hashes on save (replaces your Mongoose pre-save hook)
    }
}