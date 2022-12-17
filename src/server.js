const Hapi = require('@hapi/hapi')
const notes = require('./api/notes')
const NoteService = require('./services/inMemory/noteService')

const init = async () => {
    const noteService = new NoteService()
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: 'ignore'
            }
        }
    })

    await server.register({
        plugin: notes,
        options: {
            service: noteService
        }
    })

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

init()
