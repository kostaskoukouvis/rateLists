<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function ($faker) {
    return [
        'fname' => $faker->firstname,
        'lname' => $faker->lastName,
        'email' => $faker->email,
        'phone' => $faker->phoneNumber,
        'password' => str_random(10),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\RateList::class, function ($faker) {
	return [
		'name' => $faker->word,
	];
});

$factory->define(App\Item::class, function ($faker) {
	return [
		'name' => $faker->word,
		'rating' => $faker->numberBetween($min = 0, $max = 5)
	];
});

