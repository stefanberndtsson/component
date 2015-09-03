import Ember from 'ember';

export default Ember.Controller.extend({
	application: Ember.inject.controller(),
  queryParams: ['page', 'query'],
  isMobileBinding: 'application.isMobile',
  isDesktopBinding: 'application.isDesktop',
  loading: false
});
