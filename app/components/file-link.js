import Ember from 'ember';
import ENV from 'component/config/environment';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['target', 'href'],
  target: '_blank',
  type: 'file',
  computedFile: function() {
		if(this.get('file').length) {
	    return this.get('file')[0];
		} else {
	    return this.get('file');
		}
  }.property('file'),
  href: function() {
		return ENV.APP.fileURL+'/'+this.get('computedFile.id');
  }.property('computedFile.id'),
  imageURL: function() {
		if(this.get('type') === 'pdf') {
	    return "/img/pdf-file-24.png";
		} else {
	    return ENV.APP.fileURL+'/thumbnail/'+this.get('computedFile.id')+'?size='+this.get('size');
		}
  }.property('computedFile.id', 'size', 'type'),
  imageClass: function() {
		if(this.get('type') === 'pdf') {
	    return "pdf-link";
		} else {
	    return "image-link-thumbnail";
		}
  }.property('type'),
  name: function() {
		return Ember.Handlebars.Utils.escapeExpression(this.get('computedFile.name'));
  }.property('computedFile.name'),
  typeFile: function() {
		if(this.get('type') === 'file') { return true; }
  }.property('type'),
  typeImage: function() {
		var type = this.get('type');
		if(type === 'image' || type === 'pdf') { return true; }
  }.property('type'),
});
