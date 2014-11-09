import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value) {
    value = value || "";
    return new Ember.Handlebars.SafeString(markdown.toHTML(value));
});
