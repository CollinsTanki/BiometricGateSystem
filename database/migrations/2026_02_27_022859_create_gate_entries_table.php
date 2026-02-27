<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gate_entries', function (Blueprint $table) {
            $table->id();

            $table->string('full_name');
            $table->string('phone')->nullable();
            $table->string('id_number');

            $table->string('entry_type'); // visitor | supplier | staff
            $table->string('staff_category')->nullable(); // teaching | guard | cleaner

            $table->text('reason')->nullable(); // for visitors
            $table->text('commodities')->nullable(); // for suppliers

            $table->timestamp('entry_time')->useCurrent(); // auto entry time
            $table->timestamp('exit_time')->nullable(); // when leaving

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gate_entries');
    }
};