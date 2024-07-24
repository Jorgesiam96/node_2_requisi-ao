const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())

const users = []

const checkid = (request, response, next) => {

    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    console.log(request.method)
    console.log(request.url)



    request.userId = index
    request.iD = id




    next()
}

app.get('/users', checkid, (request, response) => {

    return response.json(users)


})

app.post('/users', checkid, (request, response) => {

    const { clienteName, order, price, status } = request.body
    const user = { id: uuid.v4(), clienteName, order, price, status }
    users.push(user)
    return response.status(201).json(user)

})

app.put('/users/:id', checkid, (request, response) => {

    const { clienteName, order, price, status } = request.body
    const id = request.iD
    const update = { id, clienteName, order, price, status }
    const index = request.userId
    if (index < 0) {
        return response.status(404).json({ messege: "id nao encontrado" })
    }
    users[index] = update

    return response.status(200).json(update)

})

app.delete('/users/:id', checkid, (request, response) => {


    const index = request.userId
    if (index < 0) {
        return response.status(404).json({ messege: "id nao encontrado" })
    }
    users.splice(index, 1)

    return response.status(204).json()


})


app.get('/users/:id', checkid, (request, response) => {

    const index = request.userId
    if (index < 0) {
        return response.status(404).json({ messege: "id nao encontrado" })
    }
    const valor = users[index]

    return response.json(valor)


})

app.patch('/users/:id', checkid, (request, response) => {
    const index = request.userId
    if (index < 0) {
        return response.status(404).json({ message: "id nao encontrado" })
    }
    users[index].status = "pronto"

    return response.json(users[index])
})

app.listen(3000, () => {
    console.log("Server started on port 3000 🚀🚀")
})

