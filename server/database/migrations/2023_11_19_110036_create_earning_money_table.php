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
        Schema::create('earning_money', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();

            $table->string('name');
            $table->string('amount');
            $table->string('date');
            $table->string('source');

            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('earning_money');
    }
};
