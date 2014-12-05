import Ember from 'ember';
import ENV from 'component/config/environment';

export default Ember.Handlebars.makeBoundHelper(function(id){
    var img = "<img class=\"pdf-image\" src=\"/img/pdf-file-24.png\"/>";
    var str = "<a target=\"_blank\" href=\""+ENV.APP.fileURL+"/"+id+"\">"+img+"</a>";
    return new Ember.Handlebars.SafeString(str);
});
