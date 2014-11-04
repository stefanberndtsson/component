import Ember from 'ember';

export default Ember.ArrayController.extend({
    queryParams: ['page', 'query'],
    itemController: 'comp.item'
});
