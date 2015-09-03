import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  isMobileBinding: 'application.isMobile',
  isDesktopBinding: 'application.isDesktop'
});
