import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Object.extend({
    simplePluralize: function(singular) {
	return singular + 's';
    },
    find: function(name, params) {
	var that = this;
	var id = null;
	if(typeof(params) === "number") {
	    id = params;
	} else if(typeof(params) === "object") {
	    id = params.id;
	    delete params.id;
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
	return Ember.$.ajax({
	    url: url,
	    method: 'get',
	    crossDomain: true,
	    type: 'json'
	});
    },
    urlOne: function(name, id, params) {
	var url = ENV.APP.serviceURL + '/' + this.simplePluralize(name) + '/' + id;
	if(params) {
	    url += '?' + Ember.$.param(params);
	}
	return url;
    },
    urlMany: function(name, params) {
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
