import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  console.log('Lista de usuários')

  response.json([
    "Mikael",
    "Diego",
    "Mike"
  ])
})

app.listen(3000)
