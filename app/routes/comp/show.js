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
	upload: function(fileUploadId) {
	    Ember.$('#upload'+fileUploadId).click();
	},
	removeAsset: function(component, assetId) {
	    var store = this.store;
	    var controller = this.get('controller');
	    var model = controller.get('model');
	    var componentId = model.id;
	    store.destroy('asset_data', assetId).then(function() {
		store.find('component', componentId).then(function(reloadedModel) {
		    controller.set('model', reloadedModel);
		});
	    });
	}
    }
});
