<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Search extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //조회 기록
        Schema::create('search', function (Blueprint $table) {
            $table->bigIncrements('search_id');
            $table->foreignId('food_id');
            $table->foreignId('location_code');
            $table->foreignId('country_code');
            $table->foreignId('company_id');
            $table->boolean('sex');
            $table->date('date');
            $table->tinyInteger('age');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('search');
    }
}
