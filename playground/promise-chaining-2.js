require('../src/db/mongoose')
const Task = require('../src/models/task')




Task.findByIdAndDelete("5dae6e10d37ce2063e95c657").then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})