import Ember from "ember";

export default Ember.Helper.helper(function(params) {
	var value = params[0];
  value = value || "";
  value = value.replace(/\n/g,'  \n');
  return new Ember.Handlebars.SafeString(markdown.toHTML(value));
});
