require('../src/db/mongoose')
const User = require('../src/models/user')

//5dadfae04e2ca19409ecade4

User.findByIdAndUpdate('5dadfae04e2ca19409ecade4', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})