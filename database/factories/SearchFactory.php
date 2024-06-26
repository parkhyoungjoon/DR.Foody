<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Search::class, function (Faker $faker) {
    $start_date = '2015-12-01';

    $end_date = '2020-5-19';

    $min = strtotime($start_date);

    $max = strtotime($end_date);



    // 위에서 얻은 타임 스탬프 값을 사용하여 난수 생성

    $val = rand($min, $max);
    $date = date('Y-m-d H:i:s', $val);
    return [
        'food_id' => rand(1, 5),
        'location_code' => rand(1,250),
        'search_sex' => rand(0,1),
        'search_date' => $date,
        'search_date' => age(10,97)
    ];
});
