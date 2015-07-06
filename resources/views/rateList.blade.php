@extends('app')

@section('content')
    <h1>
        <a href="/home"><i class="fa fa-arrow-circle-left"></i></a>
        {{ $rateList->name}} 
    </h1>
    <div id="rateListview">
        <div v-el="addForm" v-show="showForm" class="row">
            <form method="POST" v-on="submit: addItem"> 
                <div class="form">
                    <div class="col-md-11">
                    <input type="text" 
                            class="form-control" 
                            name="name" 
                            id="name" 
                            v-model="newItem.name"
                            v-el="newItem">
                            </div>
                            <div class="col-md-1">
                    <span class="action-buttons">
                        <button type="submit" 
                                class="btn btn-default"
                                v-attr="disabled: errors">
                            <span class="fa-stack fa-lg">
                              <i class="fa fa-circle-thin fa-stack-2x text-success"></i>
                              <i class="fa fa-plus fa-stack-1x text-success"></i>
                            </span>
                        </button>
                    </span>
                    </div>
                </div>
            </form>            
        </div>

        <div id="editForm" v-el="editForm" v-show="! showForm" class="row">
            <form method="POST" v-on="submit: submitChanges"> 
                <div class="form">
                    <div class="col-md-10">
                    <input type="hidden" name="_method" value="PUT"/>
                    <input type="text" 
                            class="form-control" 
                            name="name" 
                            id="name" 
                            v-model="editedItem.name"
                            v-el="editedItem">
                            </div>
                            <div class="col-md-2">
                    <span class="action-buttons">
                        <button type="submit" 
                                class="btn btn-default"
                                v-attr="disabled: isEmpty">
                            <span class="fa-stack fa-lg">
                              <i class="fa fa-circle-thin fa-stack-2x text-success"></i>
                              <i class="fa fa-check fa-stack-1x text-success"></i>
                            </span>
                        </button>
                    </span>
                    <span class="action-buttons">
                        <button type="cancel" 
                                class="btn btn-default">
                            <span class="fa-stack fa-lg">
                              <i class="fa fa-circle-thin fa-stack-2x text-warning"></i>
                              <i class="fa fa-times fa-stack-1x text-warning"></i>
                            </span>
                        </button>
                    </span>
                    </div>
                </div>
            </form>            
        </div>

       <hr/>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th><a href="#" v-on="click: sortBy('name')">Name
                        <i v-if="sortKey == 'name' && ! reverse" class="fa fa-caret-up"></i>
                        <i v-if="sortKey == 'name' && reverse" class="fa fa-caret-down"></i>
                    </a></th>
                    <th><a href="#" v-on="click: sortBy('rating')">Rating
                        <i v-if="sortKey == 'rating' && ! reverse" class="fa fa-caret-up"></i>
                        <i v-if="sortKey == 'rating' && reverse" class="fa fa-caret-down"></i>
                    </a></th>
                    <th><a href="#" v-on="click: sortBy('created_at')">Added at
                        <i v-if="sortKey == 'created_at' && ! reverse" class="fa fa-caret-up"></i>
                        <i v-if="sortKey == 'created_at' && reverse" class="fa fa-caret-down"></i>
                    </a></th>
                    <th><a href="#">Actions</a></th>
                </tr>
            </thead>
            <tbody>
                <tr v-repeat="item: items | orderBy sortKey reverse">
                    <td v-on="dblclick: editItem(item)">@{{ item.name }}</td>
                    <td>
                    <rating myrate="@{{item.rating}}" itemId="@{{item.id}}"></rating>
                    </td>
                    <td>@{{ item.created_at }}</td>
                    <td>
                    <span class="action-buttons">
                        <button type="submit" 
                                class="btn btn-default"
                                v-on="click: showInfo(item)">
                            <span class="fa-stack fa-lg">
                              <i class="fa fa-circle-thin fa-stack-2x text-info"></i>
                              <i class="fa fa-info fa-stack-1x text-info"></i>
                            </span>
                        </button>
                    </span>
                    <span class="action-buttons">
                        <button type="submit" 
                                class="btn btn-default"
                                v-on="click: deleteItem(item)">
                            <span class="fa-stack fa-lg">
                              <i class="fa fa-circle-thin fa-stack-2x text-danger"></i>
                              <i class="fa fa-trash fa-stack-1x text-danger"></i>
                            </span>
                        </button>
                    </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
@stop