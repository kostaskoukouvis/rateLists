<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RateList extends Model
{
        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'user_id'];

    protected $table = 'lists';

    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    public function items()
    {
        return $this->hasMany('App\Item', 'list_id');
    }
}

