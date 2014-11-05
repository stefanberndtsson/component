import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params) {
	return this.store.find('component', params.id);
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	controller.set('error', false);
    },
    actions: {
	saveComponent: function(component) {
	    var that = this;
	    this.store.save('component', component).then(function(newModel) {
		that.controller.set('model', newModel);
		that.store.find('tag').then(function(tags) {
		    that.controllerFor('application').set('tagsSelection', tags);
		});
		that.transitionTo('comp.show', newModel.id);
	    },function(reason) {
		if(reason.status === 401) {
		    that.send('invalidateSession');
		} else {
		    that.controller.set('error', true);
		}
	    });
	}
    }
});
