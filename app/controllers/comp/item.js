import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    isMobileBinding: 'controllers.application.isMobile',
    isDesktopBinding: 'controllers.application.isDesktop',
    needsValue: function() {
	if(this.get('model.amount') === "Fixed") {
	    return true;
	} else {
	    return false;
	}
    }.property('model.amount'),
    amount: function() {
	var amount = this.get('model.amount');
	if(!amount) {
	    return undefined;
	}

	if(amount === "Fixed") {
	    return this.get('model.amount_value');
	} else {
	    return amount;
	}
    }.property('model.amount', 'model.amount_value')
});
