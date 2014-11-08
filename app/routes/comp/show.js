import Ember from 'ember';
import ENV from '../../config/environment';

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
	    var session = this.get('session');
	    var controller = this.get('controller');
	    var model = controller.get('model');
	    var componentId = model.id;

	    Ember.$.ajax({
		type: 'DELETE',
		url: ENV.APP.fileURL+'/'+assetId,
		headers: { "Authorization": "Token " + session.get('token')}
	    }).then(function() {
		store.find('component', componentId).then(function(reloadedModel) {
		    controller.set('model', reloadedModel);
		});
	    });
	}
    }
});
