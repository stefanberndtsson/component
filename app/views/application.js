import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function() {
        var controller = this.get('controller');
        var prevLevel = controller.get('bsLevel');
        var that = this;
        Ember.$(window).on('resize', function() {
            that.setBsLevel(controller);
        });
        if(!prevLevel) { that.setBsLevel(controller); }
    },
    setBsLevel: function(controller) {
        if(Ember.$('#bs-indicator-xs').is(':visible')) {
            controller.set('bsLevel', 'xs');
        } else if(Ember.$('#bs-indicator-sm').is(':visible')) {
            controller.set('bsLevel', 'sm');
        } else if(Ember.$('#bs-indicator-md').is(':visible')) {
            controller.set('bsLevel', 'md');
        } else if(Ember.$('#bs-indicator-lg').is(':visible')) {
            controller.set('bsLevel', 'lg');
        }
    }
});
