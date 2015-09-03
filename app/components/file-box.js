import Ember from 'ember';

export default Ember.Component.extend({
  type: 'list',
  typeThumbnail: function() {
		if(this.get('type') === 'thumbnails') {
	    return true;
		}
		return false;
  }.property('type'),
  typeList: function() {
		if(this.get('type') === 'list') {
	    return true;
		}
		return false;
  }.property('type'),
  session: function() {
		return this.container.lookup('simple-auth-session:main');
  }.property(''),
  actions: {
		removeAsset: function(componentId, assetId) {
	    this.triggerAction({action: 'removeAsset', actionContext: {componentId: componentId, assetId: assetId}});
		}
  }
});
