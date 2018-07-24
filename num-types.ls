
R = require "ramda"

seamless-immutable = require "seamless-immutable"

common =  (type) ->

  nextType = type.concat [type.internal.baseType]

  nextType




base-map-show =

  number:common

  boolean:common

  undefined:common

  string:common

  function:common

  object:(type)->

    {input} = type.internal

    switch input

    | null =>

      nextType = type.concat ["null"]

      nextType

    | otherwise =>

      type.str = JSON.stringify input,1,""

      switch  Array.isArray input

      | true =>

        nextType = type.concat ["array"]

        nextType

      | otherwise =>

        nextType = type.concat ["object"]

        nextType



is-positive-number = (type) ->


  if (0 <= type.internal.input < Infinity)

    next = type.concat ["positive"]

    [true,next]

  else

    next = type.concat ["non-positive"]

    [false,next]

is-integer-number = (type) ->

  {input} = type.internal

  diff = Math.abs (input - Math.round input)

  if diff is 0

    next = type.concat ["integer"]

    [true,next]

  else

    next = type.concat ["non-integer"]


    [false,next]

type-class = (input) ->

  @internal = input

  @


type-class.of = (val) -> new typeClass(val)

type-class.create = (input) ->

  input-type = typeof input
  internal = {}

    ..input =  input

    ..base-type = input-type

    ..des = seamless-immutable []

  type = new typeClass (internal)



  base-map-show[input-type] type


type-class.prototype.getDes = -> @internal.des



type-class.prototype.concat = (add) ->

  {internal} = @

  next-des = (seamless-immutable add)

  .concat internal.des

  next-internal = seamless-immutable.setIn internal , ['des'] , next-des

  type-class.of next-internal


is-real-number = (input) ->

  type =  type-class.create input

  switch type.internal.base-type

  | "number" =>

    next = type.concat ['real']

    [true,next]

  | otherwise =>

    [false,type]


is-positive-real-number = (input) ->

  [is-real,type] = is-real-number input

  if is-real

     is-positive-number type

  else

    [false,type]


is-positive-integer-number = (input) ->


  [is-real,type] = is-real-number input

  if is-real

    [is-positive,nex0] = type |> is-positive-number

    [is-integer,nex1] = nex0 |> is-integer-number


    if is-positive and is-integer

      [true,nex1]

    else

      [false,nex1]

  else

    [false,type]






publish =

  {

  is-positive-integer-number

  is-positive-real-number

  }

module.exports = publish










