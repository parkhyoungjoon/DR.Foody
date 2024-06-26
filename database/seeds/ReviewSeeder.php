<?php

use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contents = DB::table('food_words')
        ->where('food_id',1)
        ->pluck('food_text');
        foreach($contents as $content){
            $start_date = '2019-06-01';

            $end_date = '2020-6-21';
        
            $min = strtotime($start_date);
        
            $max = strtotime($end_date);
            
            $val = rand($min, $max);
            $date = date('Y-m-d', $val);
        
            \App\Review::insert([
                'user_id' => rand(507,605),
                'food_id' => 1,
                'review_content' => $content,
                'review_date' => $date,
                'review_sweet' => rand(1,3),
                'review_salty' => rand(3,5),
                'review_hot' => rand(3,5),
                'review_sour' => 1,
                'review_bitter' => rand(1,2),
                'review_point' => rand(2,5),
                'language_code' => 1
            ]);
        }
    }
}
