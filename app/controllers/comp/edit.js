import CompItemController from 'component/controllers/comp/item';

export default CompItemController.extend({
    amountsSelectionBinding: 'controllers.application.amountsSelection',
    tagsSelectionBinding: 'controllers.application.tagsSelection'
});
