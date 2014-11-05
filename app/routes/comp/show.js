import Ember from 'ember';
// import ENV from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
	console.log("CompShowRoute.model", params);
	return this.store.find('component', params.id);
    },
    setupController: function(controller, model) {
	controller.set('model', model);
    }
});
