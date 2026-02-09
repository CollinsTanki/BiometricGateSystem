<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laptops', function (Blueprint $table) {
            $table->id();

            // Relationship
            $table->foreignId('student_id')
                  ->constrained('students')
                  ->cascadeOnDelete();

            // Laptop details
            $table->string('laptop_brand');
            $table->string('model_number');

            $table->string('serial_number')->unique();
            $table->string('mac_address')->unique();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
