import Ember from 'ember';
import ENV from '../../config/environment';
import CompItemController from '../comp/item';

export default CompItemController.extend({
    hasFiles: function() {
	return !Ember.$.isEmptyObject(this.get('model.files'));
    }.property('model.files'),
    fileURL: ENV.APP.fileURL
});
