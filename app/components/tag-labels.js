import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    tagsArray: function() {
	return this.get('tags').map(function(item) {
	    return {name: item, query: 'tags:'+item};
	});
    }.property('tags')
});
