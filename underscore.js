(function() {

  console.log("Running underscore.js... ")
  
  var _ = function (obj) {
    return {
      first: _.first.bind(obj),
      initial: _.initial.bind(null, obj),
      last: _.last.bind(null, obj),
      rest: _.rest.bind(null, obj)
    }
  };

  _.chunk = function (obj, numberOfParts) {
    var isNonEmptyArray = isArray(obj) && obj.length === 0;
    var hasInvalidNumberOfParts = numberOfParts <= 0;
    var numberOfPartsNotSpecified = arguments.length === 1;
    if (isNonEmptyArray ||
          hasInvalidNumberOfParts ||
          numberOfPartsNotSpecified) {
      return [];
    }

    if (numberOfParts === 1) {
      return obj.map(function (element) {
        return [element];
      });
    } else if (numberOfParts >= obj.length) {
      return new Array(obj);
    } else {
      var startIndex = 0;
      var arr = [];
      while (startIndex < obj.length) {
        var endIndex = startIndex + numberOfParts;
        arr.push(obj.slice(startIndex, endIndex));
        startIndex += numberOfParts;
      }
      return arr;
    }

  }

  _.compact = function (obj) {
    var arr = objectToArray(obj);
    return arr.filter(function(element) {
      return !!element
    })
  }

  _.first = _.head = _.take = function (obj, n) {
    var self = arguments.length == 0 ? this : obj;

    var isEmptyArray = isArray(self) && self.length == 0;
    if (!self || isEmptyArray) {
      return undefined;
    }

    if (isInteger(n)) {
      if (n <= 0) {
        return [];
      } else if (n > obj.length) {
        return obj;
      } else {
        return obj.slice(0, n);
      }
    }

    return self[0];
  }

  _.flatten = function (obj, isShallowFlatten) {
    // handle null and undefined values
    if (obj == null) return [];
    // convert object to array, otherwise leave value as it is
    obj = objectToArray(obj);
    // return primitive value as soon as it appears (integer, string, float, etc)
    if (!isArray(obj)) return obj;
    if (isArrayOfUndefinedValues(obj)) {
      return new Array(obj.length);
    }
    var flattenedArr = [];
    for (var index = 0; index < obj.length; index++) {
      var element = obj[index];
      if (isShallowFlatten) {
        flattenedArr = flattenedArr.concat(element);
      } else {
        flattenedArr = flattenedArr.concat(_.flatten(element));
      }
    }
    return flattenedArr;
  }

  _.initial = function (obj, lastXElementsToOmit) {
    var arr = objectToArray(obj);
    if (lastXElementsToOmit) {
      return arr.slice(0, -lastXElementsToOmit);
    }
    return arr.slice(0, -1);
  }

  _.last = function (obj, index) {
    if (obj === null || obj.length == 0) return void 0;

    if (isInteger(index)) {
      if (index <= 0) { 
        return [];
      } else {
        return obj.slice(-index);
      }
    }
    return obj[obj.length - 1];
  }

  _.map = function (obj, cb) {
    return obj.map(function (x) {
      return cb(x);
    })
  }

  _.range = function (start, end, multiplier) {
    switch (arguments.length) {
      case 1:
        if (start === 0) {
          return [];
        } else if (start < 0) {
          return _.range(0, start, -1);
        } else {
          return generateRange(start);
        }
        break;
      case 2:
        var endValue = (end >= start) ? end - 1 : end + 1;
        return generateRange(start, endValue);
        break;
      case 3:
        var arr = [];
        var i = 0;
        var val;
        if (end >= start) {
          while ((val = start + (i * multiplier)) < end) {
            arr.push(val);
            i += 1;
          }
        } else {
          while ((val = start + (i * multiplier)) > end) {
            arr.push(val);
            i += 1;
          }
        }
        return arr;
      default:
        return null;
        break;
    }
    
  }

  _.rest = _.tail = _.drop = function (numbers, index) {
    var numArray = objectToArray(numbers);
    if (index || index == 0) {
      return numArray.slice(index);
    }
    return numArray.slice(1);
  }



  // helper functions

  function generateRange(start, end) {
    var arr = [];
    if (isInteger(start) && isInteger(end)) {
      var hasNegativeZero = !!(start === 0);
      var index = 0;
      if (end >= start) {
        for (var i = start; i <= end; i++) {
          var val = i;
          val = (val === 0 && hasNegativeZero) ? -0 : val;
          arr[index] = val;
          index += 1;
        }
      } else {
        for (var i = start; i >= end; i--) {
          var val = i;
          val = (val === 0 && hasNegativeZero) ? -0 : val;
          arr[index] = val;
          index += 1;
        }
      }
    } else if (isInteger(start)) {
      arr = new Array(start);
      for (var i = 0; i < arr.length; i++) {
        arr[i] = i;
      }
    }
    return arr;
  }

  function isArray(obj) {
    return obj && Array.isArray(obj);
  }

  function isArrayOfUndefinedValues(obj) {
    var arr = objectToArray(obj);
    return arr.reduce(function (accumulator, value) {
      return accumulator && (value === void 0);
    }, true);
  }

  function isInteger(obj) {
    return Number.isInteger(obj);
  }

  // Converts an object to an array.
  // If it is not an object, returns its original value
  function objectToArray(obj) {
    var objArray;
    switch (obj.constructor) {
      case Object:
        objArray = Object.keys(obj).map(function (key) { return obj[key] });
        break;
      default:
        objArray = obj;
        break;
    }
    return objArray;
  }

  module.exports = _;

}());
