import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
	console.log("ApplicationRoute.model");
	var that = this;
	return Ember.RSVP.hash({
	    amount: that.store.find('amount'),
	    tag: that.store.find('tag')
	});
    },
    setupController: function(controller, model) {
	console.log("ApplicationRoute.setupController", model);
	controller.set('content', {});
	controller.set('amounts', {});
	controller.set('amountsSelection', model.amount);
	controller.set('tagsSelection', model.tag);
	model.amount.forEach(function(item) {
	    controller.set('amounts.'+item.id, item);
	});
    },
});
