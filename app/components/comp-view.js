import Ember from 'ember';

export default Ember.Component.extend({
    type: 'full',
    session: function() {
	return this.container.lookup('simple-auth-session:main');
    }.property(''),
    preview: function() {
	if(this.get('type') === 'preview') {
	    return true;
	}
	return false;
    }.property('type'),
    headerPrefix: function() {
	if(this.get('preview')) {
	    return "Preview: ";
	}
	return "";
    }.property('preview'),
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
    }.property('model.amount', 'model.amount_value'),
    actions: {
	upload: function(fileUploadId) {
	    Ember.$('#upload'+fileUploadId).click();
	},
	refreshModel: function(componentId) {
	    this.triggerAction({action: 'refreshModel', actionContext: componentId});
	}
    }
});
