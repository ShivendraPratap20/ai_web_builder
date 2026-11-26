<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_name', 30);
            $table->string('user_id', 254)->unique();
            $table->string('email', 254)->unique();
            $table->string('password');
            $table->string('phone_number', 10);
            $table->string('profile_picture')->nullable();
            $table->string('account_type')->default('user');
            $table->string('authorization_type')->default('local');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};