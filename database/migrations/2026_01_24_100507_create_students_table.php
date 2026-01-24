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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('student_id')->unique();
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('department');
            $table->string('major');
            $table->string('year_of_study');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->string('photo')->nullable();
            $table->json('fingerprints')->nullable(); // array of file paths
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
