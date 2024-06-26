<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('user_id');
            $table->foreignId('language_code');
            $table->foreignId('country_code');
            $table->string('id')->uniqe();
            $table->string('password');
            $table->string('nickname');
            $table->date('birth');
            $table->string('photo')->nullable();
            // 남성 =1, 여성 =0
            $table->boolean('sex');
            // 맛 정보
            $table->tinyInteger('sweet');
            $table->tinyInteger('salty');
            $table->tinyInteger('hot');
            $table->tinyInteger('sour');
            $table->tinyInteger('bitter');
            
            $table->rememberToken();
            $table->timestamps();

           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
