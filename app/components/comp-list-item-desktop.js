import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'tr',
    classNames: ['info-box-line'],
    amount: function() {
	var amount = this.get('item.amount');
	if(!amount) {
	    return undefined;
	}

	if(amount === "Fixed") {
	    return this.get('item.amount_value');
	} else {
	    return amount;
	}
    }.property('item.amount', 'item.amount_value')
});
