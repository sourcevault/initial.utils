var R, seamlessImmutable, common, baseMapShow, isPositiveNumber, isIntegerNumber, typeClass, isRealNumber, isPositiveRealNumber, isPositiveIntegerNumber, publish;
R = require("ramda");
seamlessImmutable = require("seamless-immutable");
common = function(type){
  var nextType;
  nextType = type.concat([type.internal.baseType]);
  return nextType;
};
baseMapShow = {
  number: common,
  boolean: common,
  undefined: common,
  string: common,
  'function': common,
  object: function(type){
    var input, nextType;
    input = type.internal.input;
    switch (input) {
    case null:
      nextType = type.concat(["null"]);
      return nextType;
    default:
      type.str = JSON.stringify(input, 1, "");
      switch (Array.isArray(input)) {
      case true:
        nextType = type.concat(["array"]);
        return nextType;
      default:
        nextType = type.concat(["object"]);
        return nextType;
      }
    }
  }
};
isPositiveNumber = function(type){
  var ref$, next;
  if (0 <= (ref$ = type.internal.input) && ref$ < Infinity) {
    next = type.concat(["positive"]);
    return [true, next];
  } else {
    next = type.concat(["non-positive"]);
    return [false, next];
  }
};
isIntegerNumber = function(type){
  var input, diff, next;
  input = type.internal.input;
  diff = Math.abs(input - Math.round(input));
  if (diff === 0) {
    next = type.concat(["integer"]);
    return [true, next];
  } else {
    next = type.concat(["non-integer"]);
    return [false, next];
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
  var inputType, x$, internal, type;
  inputType = typeof input;
  x$ = internal = {};
  x$.input = input;
  x$.baseType = inputType;
  x$.des = seamlessImmutable([]);
  type = new typeClass(internal);
  return baseMapShow[inputType](type);
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
isRealNumber = function(input){
  var type, next;
  type = typeClass.create(input);
  switch (type.internal.baseType) {
  case "number":
    next = type.concat(['real']);
    return [true, next];
  default:
    return [false, type];
  }
};
isPositiveRealNumber = function(input){
  var ref$, isReal, type;
  ref$ = isRealNumber(input), isReal = ref$[0], type = ref$[1];
  if (isReal) {
    return isPositiveNumber(type);
  } else {
    return [false, type];
  }
};
isPositiveIntegerNumber = function(input){
  var ref$, isReal, type, isPositive, nex0, isInteger, nex1;
  ref$ = isRealNumber(input), isReal = ref$[0], type = ref$[1];
  if (isReal) {
    ref$ = isPositiveNumber(
    type), isPositive = ref$[0], nex0 = ref$[1];
    ref$ = isIntegerNumber(
    nex0), isInteger = ref$[0], nex1 = ref$[1];
    if (isPositive && isReal) {
      return [true, nex1];
    } else {
      return [false, nex1];
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