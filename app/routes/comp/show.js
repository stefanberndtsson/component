import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
		return this.store.find('component', params.id);
  },
  setupController: function(controller, model) {
		controller.set('model', model);
		this.controllerFor('application').set('pageTitle', model.name);
  },
  actions: {
		removeAsset: function(actionData) {
	    var that = this;
	    this.store.destroy('asset_data', actionData.assetId).then(function() {
				that.send('refreshModel', actionData.componentId);
	    });
		},
		refreshModel: function(componentId) {
	    var that = this;
	    this.store.find('component', componentId).then(function(reloadedModel) {
				that.controller.set('model', reloadedModel);
	    });
		}
  }
});
