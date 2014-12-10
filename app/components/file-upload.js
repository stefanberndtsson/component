import Ember from 'ember';
import ENV from 'component/config/environment';

export default Ember.FileField.extend({
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

	var preFilters = Ember.$.Callbacks();
	var authPrefilter = function(options) {
	    if(!options.headers) {
		options.headers = {};
	    }
	    options.headers['Authorization'] = "Token "+token;
	    return options;
	};

	var uploader = Ember.Uploader.create({
	    url: uploadUrl
	});

	uploader.on('didUpload', function() {
	    that.set('value', '');
	    preFilters.remove(authPrefilter);
	    store.find('component', componentId).then(function(reloadedModel) {
		controller.set('model', reloadedModel);
	    });
	});

	if (!Ember.isEmpty(files)) {
	    Ember.$.ajaxPrefilter(preFilters.fire);
	    preFilters.add(authPrefilter);
	
	    uploader.upload(files[0], {component_id: componentId, data_type: dataType});
	}
    }).observes('files')
});
