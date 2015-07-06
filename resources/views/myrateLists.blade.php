@extends('app')

@section('content')
    <h1>
        Welcome {{Auth::user()->fname}},
        Here Lie Your Lists!
    </h1>
    <div id="mainview">
        <div class="row">
        <div v-el="createForm" v-show="showForm">
            <form method="POST" v-on="submit: createrateList"> 
                <div class="form">
                <div class="col-md-11">
                    <input type="text"
                            class="form-control"
                            name="name" 
                            id="name" 
                            v-model="newrateList.name"
                            v-el="newrateList">
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


        <div id="editForm" v-el="editForm" v-show="! showForm">
            <form method="POST" v-on="submit: submitChanges"> 
                <div class="form">
                    <div class="col-md-10">
                    <input type="hidden" name="_method" value="PUT"/>
                    <input type="text" 
                            class="form-control" 
                            name="name" 
                            id="name" 
                            v-model="editedrateList.name"
                            v-el="editedrateList">
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
        </div>
       <hr/>

        <ul class="list-group">
        <li class="list-group-item clearfix" 
            v-repeat="rateList: rateLists"
            v-on="dblclick: editrateList(rateList)">
            <a class="text" href="/rateList/@{{rateList.id}}">
             @{{ rateList.name }} </a>
            <span class="action-buttons pull-right">
                <button type="submit" 
                        class="btn btn-default"
                        v-on="click: deleterateList(rateList)">
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-circle-thin fa-stack-2x text-danger"></i>
                      <i class="fa fa-trash fa-stack-1x text-danger"></i>
                    </span>
                </button>
            </span>
        </li>
        </ul>
    </div>


@stop