import Ember from 'ember';

export default Ember.Component.extend({
    pageArray: function() {
	var pArray = [];
	var i;
	var p;
	if(this.get('pagination.pages') < 10) {
	    for(i=0;i<this.get('pagination.pages');i++) {
		p = {page: i+1};
		if(this.get('pagination.page') === i+1) {
		    p['active'] = true;
		}
		pArray.push(p);
	    }
	    return Ember.ArrayProxy.create({content: Ember.A(pArray)});
	} else {
	    var tmpArray = [];
	    var current_page = this.get('pagination.page') - 1;
	    var max_page = this.get('pagination.pages') - 1;
	    for(i=0;i<max_page+1;i++) {
		if((i <= 1) ||
		   ((i >= (current_page - 2)) && (i <= (current_page + 2))) ||
		   (i >= (max_page - 1))) {
		    p = {page: i+1};
		    if(this.get('pagination.page') === i+1) {
			p['active'] = true;
		    }
		    tmpArray.push(p);
		} else {
		    tmpArray.push({spacer: true});
		}
	    }
	    var lastSpacer = false;
	    tmpArray.forEach(function(item) {
		if(lastSpacer && item.spacer) { return; }
		pArray.push(item);
		lastSpacer = item.spacer;
	    });
	    return Ember.ArrayProxy.create({content: Ember.A(pArray)});
	}
    }.property('pagination.pages', 'pagination.page'),
});
