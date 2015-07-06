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