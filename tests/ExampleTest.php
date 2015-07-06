<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use App\RateList;
use App\Item;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;
    use DatabaseTransactions;
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->visit('/')
             ->see('RateLists');
    }

    public function testUserListCreation()
    {
        $user = factory(User::class)->create();
        $list = factory(RateList::class)->create(['user_id' => $user->id]);
        $this->actingAs($user)->visit('list')->see(''.$list->name);
    }

    public function testItemCreation()
    {
        $user = factory(User::class)->create();
        $list = factory(RateList::class)->create(['user_id' => $user->id]);
        $item = factory(Item::class)->create(['list_id' => $list->id]);
    }

}
