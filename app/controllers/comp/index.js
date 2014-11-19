import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],
    queryParams: ['page', 'query'],
    isMobileBinding: 'controllers.application.isMobile',
    isDesktopBinding: 'controllers.application.isDesktop',
    loading: false,
    pageArray: function() {
	var pArray = [];
	for(var i=0;i<this.get('model.meta.pagination.pages');i++) {
	    var p = {page: i+1};
	    if(this.get('model.meta.pagination.page') === i+1) {
		p['active'] = true;
	    }
	    pArray.push(p);
	}
	return Ember.ArrayProxy.create({content: Ember.A(pArray)});
    }.property('model.meta.pagination.pages', 'model.meta.pagination.page'),
    pageStart: function() {
	var currentPage = this.get('model.meta.pagination.page');
	var perPage = this.get('model.meta.pagination.per_page');
	if(!perPage) { return 0; }
	return ((currentPage-1) * perPage)+1;
    }.property('model.meta.pagination.page', 'model.meta.pagination.per_page'),
    pageEnd: function() {
	var currentPage = this.get('model.meta.pagination.page');
	var perPage = this.get('model.meta.pagination.per_page');
	var total = this.get('model.meta.query.total');
	if(!perPage) { return 0; }
	var pageEnd = ((currentPage-1) * perPage)+perPage;
	if(pageEnd > total) {
	    return total;
	} else {
	    return pageEnd;
	}
    }.property('model.meta.pagination.page', 'model.meta.pagination.per_page', 'model.meta.query.total'),
    singleResult: function() {
	if(this.get('model.meta.query.total') === 1) { return true; }
	return false;
    }.property('model.meta.query.total'),
});
