import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Handlebars.makeBoundHelper(function(id){
    var img = "<img class=\"pdf-image\" src=\"/img/pdf-file-128.png\"/>";
    var str = "<a target=\"_blank\" href=\""+ENV.APP.fileURL+"/"+id+"\">"+img+"</a>";
    return new Ember.Handlebars.SafeString(str);
});
