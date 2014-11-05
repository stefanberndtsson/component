import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
	page: { refreshModel: true },
	query: { refreshModel: true }
    },
    model: function(params) {
	if(!params.page) {
	    params.page = 1;
	}
	return this.store.find('result', params).then(function(data) {
	    return data;
	});
    }
});
