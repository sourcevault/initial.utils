_ = require "ramda"

chalk = require "chalk"

seamless-immutable = require "seamless-immutable"

mutable-color = {}

  ..highlight  = chalk.bold.yellow

  ..attention1 =  chalk.red.bold

  ..attention2 =  chalk.blueBright

  ..attention3 =  chalk.redBright

  ..normal =  chalk.white

color-static = seamless-immutable mutable-color

print = (internal) ->

  @internal = internal

  @

print.of = (internal) -> new print(internal)


print.create = (name,url,user_color = {}) ->

  color = seamless-immutable.merge color-static,user_color

  internal = {}

    ..color = color

    ..name = name

    ..url = url

  print.of internal


print.prototype.getColor = -> @internal.color

print.prototype.throwTypeError  = (text) !->

  {color} = @internal

  name = color.highlight @internal.name

  url = color.highlight @internal.url

  err-text = color.normal """
    [#{color.attention1 ('TYPE ERROR')}] from [#{name}]
      #{text}
      - more details on [#{name}] at:
        #{url}
  """
  console.log err-text


module.exports = print