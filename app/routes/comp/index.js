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
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('searchQuery', controller.get('query'));

	if(controller.get('page') > controller.get('model.meta.pagination.pages')) {
	    controller.transitionToRoute('comp.index', {queryParams: {page: 1}});
	    controller.set('page', 1);
	}
    },
    actions: {
	search: function(query) {
	    this.transitionTo('comp.index', {queryParams: {query: query}});
	}
    }
});
