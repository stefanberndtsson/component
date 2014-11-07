import Ember from 'ember';

export default Ember.ObjectController.extend({
    pageTitle: "Component",
    isMobile: function() {
	var bsLevel = this.get('bsLevel');
	return ((bsLevel === "xs") || (bsLevel === "sm"));
    }.property('bsLevel'),
    isDesktop: function() {
	var bsLevel = this.get('bsLevel');
	return ((bsLevel === "md") || (bsLevel === "lg"));
    }.property('bsLevel'),
    setTitle: function() {
	Ember.$(document).attr('title', 'Component - ' + this.get('pageTitle'));
    }.observes('pageTitle')
});
