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
		errors: function() {
			for (var key in this.newItem){
				if (! this.newItem[key]) return true;
			}
			return false;
		},

		isEmpty: function() {
			if (! this.editedItem) 
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
		this.fetchItems();
	},

	methods: {
		fetchItems: function() {
			this.$http.get('../api/'+ rateList_id +'/fetchItems', function(items) {
				this.$set('items', items);
			});
		},

		addItem: function(e) {
			e.preventDefault();
			var item = this.newItem;
			this.$http.post('../api/'+ rateList_id + '/addItem', item);
			this.newItem = { name: ''};
			this.fetchItems();
		},

		deleteItem: function(item) {
			this.items.$remove(item);
			this.$http.delete('../api/deleteItem/'+item.id);
		},

		editItem: function(item) { 
			this.showForm = ! this.showForm;
			this.items.$remove(item);
			this.editedItem = item;
			this.$$.editedItem.focus();
		},

		submitChanges: function(e) {
			e.preventDefault();
			var item = this.editedItem;
			this.$http.put('../api/editItem/'+item.id, item);
			this.fetchItems();
			this.editedItem = { name: ''};
			this.showForm = ! this.showForm;
		},

		sortBy: function(sortKey) {
			this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
			this.sortKey = sortKey;
		}

	}
});