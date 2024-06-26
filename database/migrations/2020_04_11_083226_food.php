<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Food extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //제품 정보
        Schema::create('food', function (Blueprint $table) {
            $table->bigIncrements('food_id');
            $table->foreignId('company_id');
            $table->string('food_name');
            $table->string('photo')->nullable();
            $table->string('materials');
            $table->string('word_photo'->nullable());
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('food');
    }
}
