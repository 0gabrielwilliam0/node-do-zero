//import { createServer } from 'node:http'

//const server = createServer((request, response)=> {
//    response.write('Olá nodeJS!')

//    return response.end()
//})

//server.listen(3333)


import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { title } from 'process'
import { request } from 'http'
import { DatabasePostgres } from './database-postgres.js'


const server = fastify()
// criando banco de dados
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

// quando eu criar POST http://.../videos => vou estar criando um vídeo

// request body
server.post('/videos', async (request, reply)=>{
    const { title, description, duration } = request.body
    
    await database.create({
        title,
        description,
        duration,
    })


//    console.log(database.list())

    return reply.status(201).send()
})

server.get('/videos', async (request)=> {
    const search = request.query.search

    //console.log(search)

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', (request, reply)=>{
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/', (request, reply)=>{
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})