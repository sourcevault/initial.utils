
R = require "ramda"

seamless-immutable = require "seamless-immutable"

identity = (type) -> (show) -> {show,type}

base-show-handle =

  number:identity "number"

  boolean:identity "boolean"

  undefined:identity "undefined"

  string:identity "string"

  function:(x)-> (show:x.toString!,type:"function")

  object:(input)->

    switch input

    | null => (type:"null",show:"null")

    | otherwise =>

      show = JSON.stringify input,1,""

      switch  Array.isArray input

      | true => (type:"array",show:show)

      | otherwise => (type:"object",show:show)


is-positive = (input) ->

  if (0 <= input < Infinity)

    true

  else

    false

is-integer = (input) ->

  diff = Math.abs (input - Math.round input)

  if diff is 0

    true

  else

    false


type-class = (input) ->

  @internal = input

  @


type-class.of = (val) -> new typeClass(val)

type-class.create = (input) ->

  input-type = typeof input

  des-list = seamless-immutable []

  internal = {}

    ..input =  input

    ..base-type = input-type

  {type,show} = base-show-handle[input-type] input

  internal.str = show

  internal.des = des-list.concat type

  new typeClass (internal)





type-class.prototype.show = (joinWith = " ") ->

  @interal.des.join joinWith


type-class.prototype.concat = (add) ->

  {internal} = @

  next-des = (seamless-immutable add)

  .concat internal.des

  next-internal = seamless-immutable.setIn internal , ['des'] , next-des

  type-class.of next-internal



is-positive-real-number = (input) ->

  type =  type-class.create input

  switch type.internal.base-type

  | "number" =>

    if (is-positive input)

      next = type.concat ['positive','real']

      [true,next]

    else

      next = type.concat ['non-positive','real']

      [false,next]


  | otherwise =>

    [false,type]


is-positive-integer-number = (input) ->

  [is-positive,type] = is-positive-real-number input


  if is-positive

    if is-integer input

      next = type.concat ["integer"]

      [true,next]

    else

      next = type.concat "non-integer"

      [false,next]

  else

    [false,type]




publish =

  {

  is-positive-integer-number

  is-positive-real-number

  }

module.exports = publish










