import _ from 'lodash'
import layer_comps from './resources/layer_comps'

class ResourceSection {
	get [RESOURCES]() {
		return layer_comps;
	}
	factory() {
		for (let i = 0, len = RESOURCES.length; i < len; i++) {
			let Section = RESOURCES[i];
			if (Section.prototype.id !== resource.id) {
				continue;
			}
			return _.tap(new Section(resource), function(s) {
				return s.parse();
			});
		}
		return null;
	}
}


var ResourceSection, _;

  _ = require();

  module.exports = ResourceSection = (function() {
    var RESOURCES;

    function ResourceSection() {}

    RESOURCES = [require('./resources/layer_comps')];

    ResourceSection.factory = function(resource) {
      var Section, _i, _len;
      for (_i = 0, _len = RESOURCES.length; _i < _len; _i++) {
        Section = RESOURCES[_i];
        if (Section.prototype.id !== resource.id) {
          continue;
        }
        return _.tap(new Section(resource), function(s) {
          return s.parse();
        });
      }
      return null;
    };

    return ResourceSection;

  })();
