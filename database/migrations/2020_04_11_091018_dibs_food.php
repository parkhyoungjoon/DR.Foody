<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DibsFood extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //찜 목록
        Schema::create('dibs_materials', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('food_id');
            $table->foreignId('country_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dibs_materials');
    }
}
