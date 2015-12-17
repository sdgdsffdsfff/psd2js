  var Descriptor, LayerComps;

  Descriptor = require('../descriptor');

  module.exports = LayerComps = (function() {
    LayerComps.prototype.id = 1065;

    LayerComps.prototype.name = 'layerComps';

    LayerComps.visibilityCaptured = function(comp) {
      return comp.capturedInfo & parseInt('001', 2) > 0;
    };

    LayerComps.positionCaptured = function(comp) {
      return comp.positionCaptured & parseInt('010', 2) > 0;
    };

    LayerComps.appearanceCaptured = function(comp) {
      return comp.appearanceCaptured & parseInt('100', 2) > 0;
    };

    function LayerComps(resource) {
      this.resource = resource;
      this.file = this.resource.file;
    }

    LayerComps.prototype.parse = function() {
      this.file.seek(4, true);
      return this.data = new Descriptor(this.file).parse();
    };

    LayerComps.prototype.names = function() {
      return this.data.list.map(function(comp) {
        return comp['Nm  '];
      });
    };

    LayerComps.prototype["export"] = function() {
      return this.data.list.map(function(comp) {
        return {
          id: comp.compID,
          name: comp['Nm  '],
          capturedInfo: comp.capturedInfo
        };
      });
    };

    return LayerComps;

  })();