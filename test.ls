main = require "./main.js"


{numTypes,print-error} = main


{isPositiveIntegerNumber,isPositiveRealNumber} = numTypes



# [isinteger,info] = (isPositiveIntegerNumber !->)

# console.log isinteger

# console.log info



# [isinteger,info] = (isPositiveIntegerNumber {})

# console.log isinteger

# console.log info


# [isinteger,info] = (isPositiveIntegerNumber undefined)

# console.log isinteger

# console.log info


# [isinteger,info] = (isPositiveIntegerNumber null)

# console.log isinteger

# console.log info



# [isinteger,info] = (isPositiveIntegerNumber [])

# console.log isinteger

# console.log info



[isinteger,info] = (isPositiveIntegerNumber 1)

console.log isinteger

console.log info


[isinteger,info] = (isPositiveIntegerNumber 1.3)

console.log isinteger

console.log info



# [isinteger,info] = (isPositiveIntegerNumber -1.3)

# console.log isinteger

# console.log info

# console.log "\n\n\n\n\n\n\n\n\n\n\n\n"

# print = print-error.create do
#   "hello"
#   "world"

# print.throwTypeError "hello"