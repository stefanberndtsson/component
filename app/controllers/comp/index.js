import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],
    queryParams: ['page', 'query'],
    isMobileBinding: 'controllers.application.isMobile',
    isDesktopBinding: 'controllers.application.isDesktop',
    loading: false
});
