var R, seamlessImmutable, identity, baseShowHandle, isPositive, isInteger, typeClass, isPositiveRealNumber, isPositiveIntegerNumber, publish;
R = require("ramda");
seamlessImmutable = require("seamless-immutable");
identity = function(type){
  return function(show){
    return {
      show: show,
      type: type
    };
  };
};
baseShowHandle = {
  number: identity("number"),
  boolean: identity("boolean"),
  undefined: identity("undefined"),
  string: identity("string"),
  'function': function(x){
    return {
      show: x.toString(),
      type: "function"
    };
  },
  object: function(input){
    var show;
    switch (input) {
    case null:
      return {
        type: "null",
        show: "null"
      };
    default:
      show = JSON.stringify(input, 1, "");
      switch (Array.isArray(input)) {
      case true:
        return {
          type: "array",
          show: show
        };
      default:
        return {
          type: "object",
          show: show
        };
      }
    }
  }
};
isPositive = function(input){
  if (0 <= input && input < Infinity) {
    return true;
  } else {
    return false;
  }
};
isInteger = function(input){
  var diff;
  diff = Math.abs(input - Math.round(input));
  if (diff === 0) {
    return true;
  } else {
    return false;
  }
};
typeClass = function(input){
  this.internal = input;
  return this;
};
typeClass.of = function(val){
  return new typeClass(val);
};
typeClass.create = function(input){
  var inputType, desList, x$, internal, ref$, type, show;
  inputType = typeof input;
  desList = seamlessImmutable([]);
  x$ = internal = {};
  x$.input = input;
  x$.baseType = inputType;
  ref$ = baseShowHandle[inputType](input), type = ref$.type, show = ref$.show;
  internal.str = show;
  internal.des = desList.concat(type);
  return new typeClass(internal);
};
typeClass.prototype.show = function(joinWith){
  joinWith == null && (joinWith = " ");
  return this.interal.des.join(joinWith);
};
typeClass.prototype.concat = function(add){
  var internal, nextDes, nextInternal;
  internal = this.internal;
  nextDes = seamlessImmutable(add).concat(internal.des);
  nextInternal = seamlessImmutable.setIn(internal, ['des'], nextDes);
  return typeClass.of(nextInternal);
};
isPositiveRealNumber = function(input){
  var type, next;
  type = typeClass.create(input);
  switch (type.internal.baseType) {
  case "number":
    if (isPositive(input)) {
      next = type.concat(['positive', 'real']);
      return [true, next];
    } else {
      next = type.concat(['non-positive', 'real']);
      return [false, next];
    }
    break;
  default:
    return [false, type];
  }
};
isPositiveIntegerNumber = function(input){
  var ref$, isPositive, type, next;
  ref$ = isPositiveRealNumber(input), isPositive = ref$[0], type = ref$[1];
  if (isPositive) {
    if (isInteger(input)) {
      next = type.concat(["integer"]);
      return [true, next];
    } else {
      next = type.concat("non-integer");
      return [false, next];
    }
  } else {
    return [false, type];
  }
};
publish = {
  isPositiveIntegerNumber: isPositiveIntegerNumber,
  isPositiveRealNumber: isPositiveRealNumber
};
module.exports = publish;