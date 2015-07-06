<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\RateList;
use App\Item;
use Auth;

class apiController extends Controller
{

    public function myrateLists()
    {
        return Auth::user()->rateLists;
    }

    public function createrateList(Request $req)
    {
        RateList::create(['name' => $req['name'], 'user_id' => Auth::id()]);
    }

    public function editrateList($id, Request $req)
    {   
        $rateList = RateList::findOrFail($id);
        $rateList->update(['name' => $req['name']]);
    }

    public function deleterateList($id)
    {
        RateList::destroy($id);
    }

    public function fetchItems($id)
    {
        $rateList = RateList::findOrFail($id);
        return $rateList->items;
    }

    public function addItem($id, Request $req)
    {
        Item::create(['name' => $req['name'],'list_id' => $id]);
    }

    public function editItem($id, Request $req)
    {
        $item = Item::findOrFail($id);
        $item->update(['name' => $req['name']]);
    }

    public function rateItem($id, Request $req)
    {
        $item = Item::findOrFail($id);
        $item->update(['rating' => $req[0]]);
    }

    public function deleteItem($id)
    {
        Item::destroy($id);
    }

}
