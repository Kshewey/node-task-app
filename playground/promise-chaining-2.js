require('../src/db/mongoose')
const Task = require('../src/models/task')




// Task.findByIdAndDelete("5dae6e10d37ce2063e95c657").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5dae6e56ee786d06696efb6a').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})
