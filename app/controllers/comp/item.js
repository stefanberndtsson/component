import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    isMobileBinding: 'controllers.application.isMobile',
    isDesktopBinding: 'controllers.application.isDesktop'
});
