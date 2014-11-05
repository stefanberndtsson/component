import CompItemController from '../comp/item';

export default CompItemController.extend({
    actions: {
	addTag: function(data) {
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
	    var duplicate = false;
	    this.get('model.tags').forEach(function(item) {
		if(item.toLowerCase() === tagValue.toLowerCase()) {
		    duplicate = true;
		}
	    });
	    if(!duplicate) {
		this.get('model.tags').pushObject(tagValue);
	    }
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
