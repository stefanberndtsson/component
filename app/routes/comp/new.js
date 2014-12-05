import CompEditRoute from 'component/routes/comp/edit';

export default CompEditRoute.extend({
    model: function() {
	return {};
    },
    setupController: function(controller, model) {
	controller.set('model', model);
	this.controllerFor('application').set('pageTitle', 'Add');
    }
});
