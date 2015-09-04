import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import ENV from 'component/config/environment';

export default Ember.Route.extend(ApplicationRouteMixin, {
	session: Ember.inject.service('simple-auth-session:main'),
	casService: function() {
		var baseUrl = window.location.origin;
		var routeUrl = this.router.generate('application');
		return baseUrl + '/' + routeUrl;
	},
	beforeModel: function(transition) {
		var ticket = transition.queryParams.ticket;
		if(ticket) {
			this.get('session').authenticate('authenticator:custom', {
				cas_ticket: ticket,
				cas_service: this.casService()
			});
		}
		return this._super(transition);
	},
  model: function() {
		var that = this;
		return Ember.RSVP.hash({
	    amount: that.store.find('amount'),
	    tag: that.store.find('tag')
		});
  },
  setupController: function(controller, model) {
		controller.set('amountsSelection', model.amount);
		controller.set('tagsSelection', model.tag);

		if(ENV.APP.casURL) {
			var casUrl = ENV.APP.casURL+'/login?'+Ember.$.param({service: this.casService()});
			controller.set('casUrl', casUrl);
		}
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
