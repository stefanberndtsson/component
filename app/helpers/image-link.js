import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Handlebars.makeBoundHelper(function(id, name, size){
    var img = "<img class=\"image-link-thumbnail\" src=\""+ENV.APP.fileURL+"/thumbnail/"+id+"?size="+size+"\"/>";
    var str = "<a target=\"_blank\" href=\""+ENV.APP.fileURL+"/"+id+"\">"+img+"</a>";
    return new Ember.Handlebars.SafeString(str);
});
