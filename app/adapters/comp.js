import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Object.extend({
    simplePluralize: function(singular) {
	return singular + 's';
    },
    find: function(name, id_or_params, maybe_params) {
	console.log("CompAdapter.find", name, id_or_params, maybe_params);
	var that = this;
	var id = null;
	var params = null;
	console.log("CompAdapter.find", name, typeof(id_or_params));

	if(typeof(id_or_params) === "number" || typeof(id_or_params) === "string") {
	    id = id_or_params;
	    params = maybe_params;
	} else if(typeof(id_or_params) === "object") {
	    id = id_or_params.id;
	    delete id_or_params.id;
	    params = id_or_params;
	}

	if(id) {
	    return this.fetch(this.urlOne(name, id, params))
		.then(function(data) {
		    return that.extractOne(name, data);
		});
	} else {
	    return this.fetch(this.urlMany(name, params))
		.then(function(data) {
		    return that.extractMany(name, data);
		});
	}
    },
    fetch: function(url) {
	console.log("CompAdapter.fetch", url);
	return Ember.$.ajax({
	    url: url,
	    method: 'get',
	    crossDomain: true,
	    type: 'json'
	});
    },
    urlOne: function(name, id, params) {
	console.log("CompAdapter.urlOne", name, id, params);
	var url = ENV.APP.serviceURL + '/' + this.simplePluralize(name) + '/' + id;
	if(params) {
	    url += '?' + Ember.$.param(params);
	}
	return url;
    },
    urlMany: function(name, params) {
	console.log("CompAdapter.urlMany", name, params);
	var url = ENV.APP.serviceURL + '/' + this.simplePluralize(name);
	if(params) {
	    url += '?' + Ember.$.param(params);
	}
	return url;
    },
    extractOne: function(name, data) {
	data[name].meta = data.meta;
	return data[name];
    },
    extractMany: function(name, data) {
	var plural = this.simplePluralize(name);
	var list = data[plural];
	list.meta = data.meta;
	return list;
    }
});
