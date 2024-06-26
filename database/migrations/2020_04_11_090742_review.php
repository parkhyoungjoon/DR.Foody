<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Review extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 리뷰
        Schema::create('review', function (Blueprint $table) {
            $table->bigIncrements('review_id');
            $table->foreignId('user_id');
            $table->foreignId('food_id');
            $table->foreignId('language_code');
            $table->foreignId('country_code');
            $table->string('content');
            $table->tinyInteger('sweet');
            $table->tinyInteger('salty');
            $table->tinyInteger('hot');
            $table->tinyInteger('sour');
            $table->tinyInteger('bitter');
            $table->date('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('review');
    }
}
