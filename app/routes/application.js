import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
		console.log("ApplicationRoute.model");
		var that = this;
		return Ember.RSVP.hash({
	    amount: that.store.find('amount'),
	    tag: that.store.find('tag')
		});
  },
  setupController: function(controller, model) {
		controller.set('amountsSelection', model.amount);
		controller.set('tagsSelection', model.tag);
  },
  actions: {
		willTransition: function() {
	    this.controller.set('loading', true);
		},
		didTransition: function() {
	    var that = this;
	    Ember.run.later(function() {
				that.controller.set('loading', false);
	    });
		},
		sessionAuthenticationFailed: function(error) {
	    this.controllerFor('login').set('error', error);
		},
		refreshTags: function() {
	    var that = this;
	    this.store.find('tag').then(function(tags) {
				that.controller.set('tagsSelection', tags);
	    });
		}
  }
});
