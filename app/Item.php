<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'rating', 'list_id'];

    public function rateList()
    {
        return $this->belongsTo('App\RateList');
    }
}
