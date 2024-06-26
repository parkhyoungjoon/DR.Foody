<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AvoidMaterial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //기피 원재료
        Schema::create('avoid_material', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('material_code');
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
        Schema::dropIfExists('avoid_material');
    }
}
