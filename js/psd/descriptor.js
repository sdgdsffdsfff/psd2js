  var Descriptor;

  module.exports = Descriptor = (function() {
    function Descriptor(file) {
      this.file = file;
      this.data = {};
    }

    Descriptor.prototype.parse = function() {
      var i, id, numItems, value, _i, _ref;
      this.data["class"] = this.parseClass();
      numItems = this.file.readInt();
      for (i = _i = 0; 0 <= numItems ? _i < numItems : _i > numItems; i = 0 <= numItems ? ++_i : --_i) {
        _ref = this.parseKeyItem(), id = _ref[0], value = _ref[1];
        this.data[id] = value;
      }
      return this.data;
    };

    Descriptor.prototype.parseClass = function() {
      return {
        name: this.file.readUnicodeString(),
        id: this.parseId()
      };
    };

    Descriptor.prototype.parseId = function() {
      var len;
      len = this.file.readInt();
      if (len === 0) {
        return this.file.readString(4);
      } else {
        return this.file.readString(len);
      }
    };

    Descriptor.prototype.parseKeyItem = function() {
      var id, value;
      id = this.parseId();
      value = this.parseItem();
      return [id, value];
    };

    Descriptor.prototype.parseItem = function(type) {
      if (type == null) {
        type = null;
      }
      if (type == null) {
        type = this.file.readString(4);
      }
      switch (type) {
        case 'bool':
          return this.parseBoolean();
        case 'type':
        case 'GlbC':
          return this.parseClass();
        case 'Objc':
        case 'GlbO':
          return new Descriptor(this.file).parse();
        case 'doub':
          return this.parseDouble();
        case 'enum':
          return this.parseEnum();
        case 'alis':
          return this.parseAlias();
        case 'Pth':
          return this.parseFilePath();
        case 'long':
          return this.parseInteger();
        case 'comp':
          return this.parseLargeInteger();
        case 'VlLs':
          return this.parseList();
        case 'ObAr':
          return this.parseObjectArray();
        case 'tdta':
          return this.parseRawData();
        case 'obj ':
          return this.parseReference();
        case 'TEXT':
          return this.file.readUnicodeString();
        case 'UntF':
          return this.parseUnitDouble();
        case 'UnFl':
          return this.parseUnitFloat();
      }
    };

    Descriptor.prototype.parseBoolean = function() {
      return this.file.readBoolean();
    };

    Descriptor.prototype.parseDouble = function() {
      return this.file.readDouble();
    };

    Descriptor.prototype.parseInteger = function() {
      return this.file.readInt();
    };

    Descriptor.prototype.parseLargeInteger = function() {
      return this.file.readLongLong();
    };

    Descriptor.prototype.parseIdentifier = function() {
      return this.file.readInt();
    };

    Descriptor.prototype.parseIndex = function() {
      return this.file.readInt();
    };

    Descriptor.prototype.parseOffset = function() {
      return this.file.readInt();
    };

    Descriptor.prototype.parseProperty = function() {
      return {
        "class": this.parseClass(),
        id: this.parseId()
      };
    };

    Descriptor.prototype.parseEnum = function() {
      return {
        type: this.parseId(),
        value: this.parseId()
      };
    };

    Descriptor.prototype.parseEnumReference = function() {
      return {
        "class": this.parseClass(),
        type: this.parseId(),
        value: this.parseId()
      };
    };

    Descriptor.prototype.parseAlias = function() {
      var len;
      len = this.file.readInt();
      return this.file.readString(len);
    };

    Descriptor.prototype.parseFilePath = function() {
      var len, numChars, path, pathSize, sig;
      len = this.file.readInt();
      sig = this.file.readString(4);
      pathSize = this.file.read('<i');
      numChars = this.file.read('<i');
      path = this.file.readUnicodeString(numChars);
      return {
        sig: sig,
        path: path
      };
    };

    Descriptor.prototype.parseList = function() {
      var count, i, items, _i;
      count = this.file.readInt();
      items = [];
      for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
        items.push(this.parseItem());
      }
      return items;
    };

    Descriptor.prototype.parseObjectArray = function() {
      throw "Descriptor object array not implemented yet @ " + (this.file.tell());
    };

    Descriptor.prototype.parseRawData = function() {
      var len;
      len = this.file.readInt();
      return this.file.read(len);
    };

    Descriptor.prototype.parseReference = function() {
      var i, items, numItems, type, value, _i;
      numItems = this.file.readInt();
      items = [];
      for (i = _i = 0; 0 <= numItems ? _i < numItems : _i > numItems; i = 0 <= numItems ? ++_i : --_i) {
        type = this.file.readString(4);
        value = (function() {
          switch (type) {
            case 'prop':
              return this.parseProperty();
            case 'Clss':
              return this.parseClass();
            case 'Enmr':
              return this.parseEnumReference();
            case 'Idnt':
              return this.parseIdentifier();
            case 'indx':
              return this.parseIndex();
            case 'name':
              return this.file.readUnicodeString();
            case 'rele':
              return this.parseOffset();
          }
        }).call(this);
        items.push({
          type: type,
          value: value
        });
      }
      return items;
    };

    Descriptor.prototype.parseUnitDouble = function() {
      var unit, unitId, value;
      unitId = this.file.readString(4);
      unit = (function() {
        switch (unitId) {
          case '#Ang':
            return 'Angle';
          case '#Rsl':
            return 'Density';
          case '#Rlt':
            return 'Distance';
          case '#Nne':
            return 'None';
          case '#Prc':
            return 'Percent';
          case '#Pxl':
            return 'Pixels';
          case '#Mlm':
            return 'Millimeters';
          case '#Pnt':
            return 'Points';
        }
      })();
      value = this.file.readDouble();
      return {
        id: unitId,
        unit: unit,
        value: value
      };
    };

    Descriptor.prototype.parseUnitFloat = function() {
      var unit, unitId, value;
      unitId = this.file.readString(4);
      unit = (function() {
        switch (unitId) {
          case '#Ang':
            return 'Angle';
          case '#Rsl':
            return 'Density';
          case '#Rlt':
            return 'Distance';
          case '#Nne':
            return 'None';
          case '#Prc':
            return 'Percent';
          case '#Pxl':
            return 'Pixels';
          case '#Mlm':
            return 'Millimeters';
          case '#Pnt':
            return 'Points';
        }
      })();
      value = this.file.readFloat();
      return {
        id: unitId,
        unit: unit,
        value: value
      };
    };

    return Descriptor;

  })();
