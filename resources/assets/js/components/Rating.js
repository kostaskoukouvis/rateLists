module.exports = {  
  
  props: ['myrate', 'itemId'],

  template: require('./rating.template.html'),

  data: function() {
		return {
  			active1: false,
  			active2: false,
  			active3: false,
  			active4: false,
  			active5: false
		};
  },

  ready: function() {
  		this.showRating(this.myrate);
  },

  methods: {

		showRating: function(rating) {
			if (rating == 0)
			{
				this.active1 = false;
				this.active2 = false;
				this.active3 = false;
				this.active4 = false;
				this.active5 = false;
			} else
			if (rating == 1)
			{
				this.active1 = true;
				this.active2 = false;
				this.active3 = false;
				this.active4 = false;
				this.active5 = false;
			} else 
			if (rating == 2)
			{
				this.active1 = true;
				this.active2 = true;
				this.active3 = false;
				this.active4 = false;
				this.active5 = false;
			} else
			if (rating == 3)
			{
				this.active1 = true;
				this.active2 = true;
				this.active3 = true;
				this.active4 = false;
				this.active5 = false;
			} else
			if (rating == 4)
			{
				this.active1 = true;
				this.active2 = true;
				this.active3 = true;
				this.active4 = true;
				this.active5 = false;
			} else
			{
				this.active1 = true;
				this.active2 = true;
				this.active3 = true;
				this.active4 = true;
				this.active5 = true;
			}
		},

		rateItem: function(rating) {
			this.$http.put('../api/rateItem/'+this.itemId, rating);
			console.log(this.itemId + 'has' + rating);
			this.showRating(rating);
		}
  }

};