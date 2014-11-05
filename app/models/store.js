import Ember from 'ember';

export default Ember.Object.extend({
    adapter: function() {
	return this.container.lookup('adapter:comp');
    },
    find: function(name, id) {
	return this.adapter().find(name, id);
    }
});
