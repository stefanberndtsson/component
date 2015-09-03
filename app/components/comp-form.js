import Ember from 'ember';

export default Ember.Component.extend({
  type: 'edit',
  amountsSelection: function() {
		return this.get('targetObject.amountsSelection');
  }.property('targetObject.amountsSelection'),
  tagsSelection: function() {
		return this.get('targetObject.tagsSelection');
  }.property('targetObject.tagsSelection'),
  headerPrefix: function() {
		if(this.get('type') === 'new') {
	    return "Add: ";
		}
		return "Edit: ";
  }.property('type'),
  needsValue: function() {
		if(this.get('model.amount') === "Fixed") {
	    return true;
		} else {
	    return false;
		}
  }.property('model.amount'),
  errors: function() {
		return this.get('model.errors');
  }.property('model.errors'),
  error: function() {
		return this.get('targetObject.error');
  }.property('targetObject.error'),
  actions: {
		saveComponent: function() {
	    this.triggerAction({action: 'saveComponent', actionContext: this.get('model')});
		},
		addTag: function(data) {
	    var newTags = [];
	    var lower = data.toLowerCase();
	    if(!this.get('model.tags')) {
				this.set('model.tags', []);
	    }
	    var tagValue = data;
	    this.get('tagsSelection').forEach(function(item) {
				if(item.norm === lower) {
					tagValue = item.name;
				}
	    });
	    newTags.push(tagValue);
	    var duplicate = false;
	    this.get('model.tags').reverse().forEach(function(item) {
				if(item.toLowerCase() === tagValue.toLowerCase()) {
					duplicate = true;
				} else {
					newTags.unshift(item);
				}
	    });
	    this.set('model.tags', newTags);
	    this.set('tagInput', '');
		},
		removeTag: function(data) {
	    var newTags = [];
	    this.get('model.tags').forEach(function(item) {
				if(item !== data) {
					newTags.push(item);
				}
	    });
	    this.set('model.tags', newTags);
		}
  }
});
