Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

var mainview = new Vue({
	el: '#mainview',

	data: {
		newrateList: {
			name: ''
		},
		editedrateList: {
			name: ''
		},
		showForm: true
	},

	computed: {
		errors: function() {
			for (var key in this.newrateList){
				if (! this.newrateList[key]) return true;
			}
			return false;
		},

		isEmpty: function() {
			if (! this.editedrateList) 
			{
				return true;
			} 
			else 
			{
				return false;
			}
		}
	},

	ready: function() {
		this.myrateLists();
	},

	methods: {
		myrateLists: function() {
			this.$http.get('api/myrateLists', function(rateLists) {
				this.$set('rateLists', rateLists);
			});
		},

		createrateList: function(e) {
			e.preventDefault();
			this.$http.post('api/createrateList', this.newrateList);
			this.myrateLists();
			this.newrateList = { name: ''};
		},

		deleterateList: function(rateList) {
			this.rateLists.$remove(rateList);
			this.$http.delete('api/deleterateList/'+rateList.id);
		},

		editrateList: function(rateList) { 
			this.showForm = ! this.showForm;
			this.rateLists.$remove(rateList);
			this.editedrateList = rateList;
			this.$$.editedrateList.focus();
		},

		submitChanges: function(e) {
			e.preventDefault();
			var rateList = this.editedrateList;
			this.$http.put('api/editrateList/'+rateList.id, rateList);
			this.myrateLists();
			this.editedrateList = { name: ''};
			this.showForm = ! this.showForm;
		}

	}
});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var url = window.location.pathname;
var rateList_id = url.substring(url.lastIndexOf('/') + 1);
var rateListView = new Vue({
	el: '#rateListview',

	components: {
		rating: require('./components/Rating')
	},

	data: {
		newItem: {
			name: ''
		},
		editedItem: {
			name: ''
		},
		showForm: true,
		sortKey: 'created_at',
		reverse: false
	},

	computed: {
		errors: function errors() {
			for (var key in this.newItem) {
				if (!this.newItem[key]) return true;
			}
			return false;
		},

		isEmpty: function isEmpty() {
			if (!this.editedItem) {
				return true;
			} else {
				return false;
			}
		}
	},

	ready: function ready() {
		this.fetchItems();
	},

	methods: {
		fetchItems: function fetchItems() {
			this.$http.get('../api/' + rateList_id + '/fetchItems', function (items) {
				this.$set('items', items);
			});
		},

		addItem: function addItem(e) {
			e.preventDefault();
			var item = this.newItem;
			this.$http.post('../api/' + rateList_id + '/addItem', item);
			this.newItem = { name: '' };
			this.fetchItems();
		},

		deleteItem: function deleteItem(item) {
			this.items.$remove(item);
			this.$http['delete']('../api/deleteItem/' + item.id);
		},

		editItem: function editItem(item) {
			this.showForm = !this.showForm;
			this.items.$remove(item);
			this.editedItem = item;
			this.$$.editedItem.focus();
		},

		submitChanges: function submitChanges(e) {
			e.preventDefault();
			var item = this.editedItem;
			this.$http.put('../api/editItem/' + item.id, item);
			this.fetchItems();
			this.editedItem = { name: '' };
			this.showForm = !this.showForm;
		},

		sortBy: function sortBy(sortKey) {
			this.reverse = this.sortKey == sortKey ? !this.reverse : false;
			this.sortKey = sortKey;
		}

	}
});

},{"./components/Rating":2}],2:[function(require,module,exports){
'use strict';

module.exports = {

	props: ['myrate', 'itemId'],

	template: require('./rating.template.html'),

	data: function data() {
		return {
			active1: false,
			active2: false,
			active3: false,
			active4: false,
			active5: false
		};
	},

	ready: function ready() {
		this.showRating(this.myrate);
	},

	methods: {

		showRating: function showRating(rating) {
			if (rating == 0) {
				this.active1 = false;
				this.active2 = false;
				this.active3 = false;
				this.active4 = false;
				this.active5 = false;
			} else if (rating == 1) {
				this.active1 = true;
				this.active2 = false;
				this.active3 = false;
				this.active4 = false;
				this.active5 = false;
			} else if (rating == 2) {
				this.active1 = true;
				this.active2 = true;
				this.active3 = false;
				this.active4 = false;
				this.active5 = false;
			} else if (rating == 3) {
				this.active1 = true;
				this.active2 = true;
				this.active3 = true;
				this.active4 = false;
				this.active5 = false;
			} else if (rating == 4) {
				this.active1 = true;
				this.active2 = true;
				this.active3 = true;
				this.active4 = true;
				this.active5 = false;
			} else {
				this.active1 = true;
				this.active2 = true;
				this.active3 = true;
				this.active4 = true;
				this.active5 = true;
			}
		},

		rateItem: function rateItem(rating) {
			this.$http.put('../api/rateItem/' + this.itemId, rating);
			console.log(this.itemId + 'has' + rating);
			this.showRating(rating);
		}
	}

};

},{"./rating.template.html":3}],3:[function(require,module,exports){
module.exports = '<i class="fa fa-star-o" \n	v-on="click: rateItem(1)"\n	v-show="!active1"\n	></i>\n<i class="fa fa-star" \n	v-on="click: rateItem(1)"\n	v-show="active1" \n	v-class="activeStar: active1"\n	></i>\n\n<i class="fa fa-star-o" \n	v-on="click: rateItem(2)"\n	v-show="!active2"\n	></i>\n<i class="fa fa-star" \n	v-on="click: rateItem(2)"\n	v-show="active2" \n	v-class="activeStar: active2"\n	></i>\n\n<i class="fa fa-star-o" \n	v-on="click: rateItem(3)"\n	v-show="!active3"\n	></i>\n<i class="fa fa-star" \n	v-on="click: rateItem(3)"\n	v-show="active3" \n	v-class="activeStar: active3"\n	></i>\n\n<i class="fa fa-star-o" \n	v-on="click: rateItem(4)"\n	v-show="!active4"\n	></i>\n<i class="fa fa-star" \n	v-on="click: rateItem(4)"\n	v-show="active4" \n	v-class="activeStar: active4"\n	></i>\n\n<i class="fa fa-star-o" \n	v-on="click: rateItem(5)"\n	v-show="!active5"\n	></i>\n<i class="fa fa-star" \n	v-on="click: rateItem(5)"\n	v-show="active5" \n	v-class="activeStar: active5"\n	></i>';
},{}]},{},[1]);

//# sourceMappingURL=app.js.map