const express = require('express')
const app = express()
const cors = require('cors')

// app.use(express.json(), cors())
app.use(express.json(), express.static('build'))
// app.use(express.json())
let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Bonnie Irate",
        "number": "123 000",
        "id": 2
    },
    {
        "name": "Tom",
        "number": "123",
        "id": 3
    },
    {
        "name": "Tom",
        "number": "12-24-5323532",
        "id": 4
    },
    {
        "name": "Kurt",
        "number": "is a duck boi",
        "id": 5
    }
]
//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(persons))
//   })

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
app.get('/info', (req, res) => {
    res.send(`<p>Phone has info for ${persons.length} <p>
         <p>${new Date(Date.now())}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id)
    if (person) res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    console.log(req.params)
    const id = Number(req.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()

})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

const PORT = process.env.PORT || 3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`)