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
        Schema::create('paying_limits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->index();

            $table->bigInteger('limit');
            $table->integer('month');
            $table->integer('year');

            $table->foreign('category_id')->references('id')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paying_limits');
    }
};
