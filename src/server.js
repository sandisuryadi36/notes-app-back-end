require('dotenv').config()
const Hapi = require('@hapi/hapi')
const notes = require('./api/notes')
const NoteService = require('./services/postgres/noteService')
const NotesValidator = require('./validator/notes')

const init = async () => {
    const noteService = new NoteService()
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: 'ignore'
            }
        }
    })

    await server.register({
        plugin: notes,
        options: {
            service: noteService,
            validator: NotesValidator
        }
    })

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

init()
