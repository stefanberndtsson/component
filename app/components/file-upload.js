import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.FileField.extend({
    url: '',
    multiple: false,
    filesDidChange: (function() {
	var that = this;
	var files = this.get('files');
	if(Ember.isEmpty(files)) {
	    return;
	}
	var controller = this.get('targetObject');
	var store = this.get('targetObject.store');
	var componentId = this.get('componentId');
	var dataType = this.get('dataType');
	var uploadUrl = ENV.APP.fileURL;
	var token = this.container.lookup('simple-auth-session:main').get('token');
	
	if(!token) { return; }

	var uploader = Ember.Uploader.create({
	    url: uploadUrl
	});

	uploader.on('didUpload', function() {
	    that.set('value', '');
	    store.find('component', componentId).then(function(reloadedModel) {
		controller.set('model', reloadedModel);
	    });
	});

	if (!Ember.isEmpty(files)) {
	    uploader.upload(files[0], {component_id: componentId, data_type: dataType, token: token});
	}
    }).observes('files')
});
