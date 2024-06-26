<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SearchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 5000; $i++){
            $start_date = '2020-01-01';

            $end_date = '2020-06-08';
        
            $min = strtotime($start_date);
        
            $max = strtotime($end_date);
        
        
        
            // 위에서 얻은 타임 스탬프 값을 사용하여 난수 생성
        
            $val = rand($min, $max);
            $date = date('Y-m-d H:i:s', $val);
            \App\Search::insert([
                'food_id' => 1,
                'location_code' => rand(1,494),
                'search_sex' => rand(0,1),
                'search_date' => $date,
                'search_age' => rand(10,97)
            ]);
        }
    }
}
