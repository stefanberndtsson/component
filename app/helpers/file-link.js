import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Handlebars.makeBoundHelper(function(id, name){
    var escapedName = Ember.Handlebars.Utils.escapeExpression(name);
    var str = "<a target=\"_blank\" href=\""+ENV.APP.fileURL+"/"+id+"\">"+escapedName+"</a>";
    return new Ember.Handlebars.SafeString(str);
});
