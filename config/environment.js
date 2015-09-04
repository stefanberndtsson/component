/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
		modulePrefix: 'component',
		environment: environment,
		baseURL: '/',
		locationType: 'hash',
		EmberENV: {
	    FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
	    }
		},

		APP: {
	    // Here you can pass flags/options to your application instance
	    // when it is created
			casURL: process.env.CAS_URL
		}
  };

  if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		ENV.APP.LOG_VIEW_LOOKUPS = true;
		ENV.contentSecurityPolicyHeader = 'Disabled-Content-Security-Policy';
		ENV.APP.authenticationBaseURL = 'http://localhost:3019/session';
		ENV.APP.serviceURL = 'http://localhost:3019';
		ENV.APP.fileURL = 'http://localhost:3019/asset_data';
  }

  if (environment === 'test') {
		// Testem prefers this...
		ENV.baseURL = '/';
		ENV.locationType = 'auto';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
		ENV.APP.authenticationBaseURL = 'https://component-api.nocrew.org/session';
		ENV.APP.serviceURL = 'https://component-api.nocrew.org';
		ENV.APP.fileURL = 'https://component-api.nocrew.org/asset_data';
  }

  return ENV;
};
