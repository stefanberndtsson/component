import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
	page: { refreshModel: true },
	query: { refreshModel: true }
    },
    model: function(params) {
	return this.store.find('result', params).then(function(data) {
	    return data;
	});
    }
});
