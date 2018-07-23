var _, chalk, seamlessImmutable, x$, mutableColor, colorStatic, print;
_ = require("ramda");
chalk = require("chalk");
seamlessImmutable = require("seamless-immutable");
x$ = mutableColor = {};
x$.highlight = chalk.bold.yellow;
x$.attention1 = chalk.red.bold;
x$.attention2 = chalk.blueBright;
x$.attention3 = chalk.redBright;
x$.normal = chalk.white;
colorStatic = seamlessImmutable(mutableColor);
print = function(internal){
  this.internal = internal;
  return this;
};
print.of = function(internal){
  return new print(internal);
};
print.prototype.create = function(name, url, user_color){
  var color, x$, internal;
  user_color == null && (user_color = {});
  color = seamlessImmutable.merge(colorStatic, user_color);
  x$ = internal = {};
  x$.color = color;
  x$.name = name;
  x$.url = url;
  return print.of(internal);
};
print.prototype.getColor = function(){
  return this.internal.color;
};
print.prototype.throwTypeError = function(text){
  var color, name, url, errText;
  color = this.internal.color;
  name = color.highlight(this.internal.name);
  url = color.highlight(this.internal.url);
  errText = color.normal("\n[" + color.mainAttention('TYPE ERROR') + "] from [" + name + "]\n\n  " + text + "\n  - more details on [" + name + "] at:\n\n    " + url + "\n");
  return console.log(errText);
};
modulue.exports = print;