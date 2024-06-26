<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FestMaterial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('fest_materials', function (Blueprint $table) {
            $table->foreignId('fest_id');
            $table->foreignId('keyword_id');

            $table->foreign('fest_id')->references('fest_id')->on('fest_selects')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('keyword_id')->references('keyword_id')->on('material_keywords')->constrained()->onDelete('cascade')->onUpdate('cascade');
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
