<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

use App\RateList;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ListController extends Controller
{
    /**
     * Display a listing of the rateLists.
     *
     * @return Response
     */
    public function index()
    {
        return view('myrateLists');
    }
 

    /**
     * Display the specified rateList.
     *
     * @param  int  $id
     * @return Response
     */
    public function showrateList($id)
    {
        $rateList = RateList::findOrFail($id);

        return view('rateList', compact('rateList'));
    }

}
