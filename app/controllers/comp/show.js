import Ember from 'ember';
import CompItemController from '../comp/item';

export default CompItemController.extend({
    hasFiles: function() {
	return !Ember.$.isEmptyObject(this.get('model.files'));
    }.property('model.files')
});
