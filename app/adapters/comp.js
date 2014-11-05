import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Object.extend({
    simplePluralize: function(singular) {
	return singular + 's';
    },
    findOne: function(name, id, params) {
	var that = this;
	return this.fetch(this.urlOne(name, id, params))
	    .then(function(data) {
		return that.extractOne(name, data);
	    });
    },
    findMany: function(name, params) {
	var that = this;
	return this.fetch(this.urlMany(name, params))
	    .then(function(data) {
		return that.extractMany(name, data);
	    });
    },
    fetch: function(url) {
	return Ember.$.ajax({
	    url: url,
	    method: 'get',
	    crossDomain: true,
	    type: 'json'
	});
    },
    send: function(url, method, data) {
	return Ember.$.ajax({
	    url: url,
	    method: method,
	    crossDomain: true,
	    type: 'json',
	    data: data
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
    },
    saveUpdate: function(name, id, data) {
	var that = this;
	var session = this.container.lookup('simple-auth-session:main');
	var dataObject = {};
	dataObject[name] = data;
	dataObject['token'] = session.get('token');
	return this.send(this.urlOne(name, id), 'put', dataObject)
	    .then(function(data) {
		return that.extractOne(name, data);
	    });
    },
    saveCreate: function(name, data) {
	var that = this;
	var session = this.container.lookup('simple-auth-session:main');
	var dataObject = {};
	dataObject[name] = data;
	dataObject['token'] = session.get('token');
	return this.send(this.urlMany(name), 'post', dataObject)
	    .then(function(data) {
		return that.extractOne(name, data);
	    });
    }
});
