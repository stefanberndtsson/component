import Ember from 'ember';

export default Ember.Component.extend({
    pageArray: function() {
	var pArray = [];
	for(var i=0;i<this.get('pagination.pages');i++) {
	    var p = {page: i+1};
	    if(this.get('pagination.page') === i+1) {
		p['active'] = true;
	    }
	    pArray.push(p);
	}
	return Ember.ArrayProxy.create({content: Ember.A(pArray)});
    }.property('pagination.pages', 'pagination.page'),
});
