<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Selldata extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('selldatas', function (Blueprint $table) {
            $table->foreignId('food_id');
            $table->foreignId('user_id');
            $table->foreignId('data_code');
            $table->date('selldata_start');
            $table->date('selldata_end');
            $table->date('selldata_date');

            $table->foreign('user_id')->references('user_id')->on('users')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('food_id')->references('food_id')->on('foods')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('data_code')->references('data_code')->on('selldata_codes')->constrained()->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
