<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Taste extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //식품별 맛 정보
        Schema::create('taste', function (Blueprint $table) {
            $table->foreignId('food_id');
            $table->foreignId('taste_code');
            $table->tinyInteger('lv');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('taste');
    }
}
