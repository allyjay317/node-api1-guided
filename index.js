const express = require('express')
const shortid = require('shortid')

let hubs = []

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.json({ hello: 'world' })
})

server.get('/hello', (req, res) => {
  res.json({ hello: 'lambda school' })
})

server.post('/api/hubs', (req, res) => {
  const hubInfo = req.body



  hubs.push({ ...hubInfo, id: shortid.generate() })
  res.status(201).json(hubInfo)
})

server.get('/api/hubs', (req, res) => {
  res.status(200).json(hubs)
})

server.delete('/api/hubs/:id', (req, res) => {
  const { id } = req.params

  const deleted = hubs.find(hub => hub.id === id)

  if (deleted) {
    hubs = hubs.filter(hub => hub.id !== id)
    res.status(200).json(deleted)
  }
  else {
    res.status(404).json({ message: "id not found" })
  }

})

server.patch('/api/hubs/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body;

  let found = hubs.find(hub => hub.id === id)

  if (found) {
    Object.assign(found, changes)
    res.status(200).json(found)
  } else {
    res.status(404).json({ message: 'id not found' })
  }
})

server.put('/api/hubs/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  changes.id = id

  let index = hubs.findIndex(hub => hub.id === id)

  if (index !== -1) {
    hubs[index] = changes
    res.status(200).json(hubs[index])
  } else {
    res.status(404).json({ message: 'id not found' })
  }
})

const PORT = 5000

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`)
})