const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload

    const id = nanoid(8)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote)

    const isSuccess = notes.filter((notes) => notes.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        })
        console.log('[log] add note ID:', id)
        response.code(201)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    })
    response.code(500)
    console.log('[log] add note failed')
    return response
}

const editNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload
    const { id } = request.params
    const updatedAt = new Date().toISOString()

    const index = notes.findIndex(n => n.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diupdate',
            data: {
                noteId: id
            }
        })
        console.log('[log] update note ID:', id)
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    })
    response.code(404)
    console.log('[log] update note failed')
    return response
}

const deletNoteHandler = (request, h) => {
    const { id } = request.params

    const index = notes.findIndex(n => n.id === id)

    if (index !== -1) {
        notes.splice(index, 1)

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        })
        console.log('[log] update note ID:', id)
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    })
    response.code(404)
    console.log('[log] delete note failed')
    return response
}

const getAllNotesHandler = () => {
    const res = {
        status: 'success',
        data: {
            notes
        }
    }

    console.log('[log] get all notes')
    return res
}

const getNoteByIDHandler = (request, h) => {
    const { id } = request.params
    const noteData = notes.filter(note => note.id === id)[0]
    if (noteData !== undefined) {
        const res = {
            status: 'success',
            data: { note: noteData }
        }

        console.log('[log] get note : ID', id)
        return res
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIDHandler,
    editNoteHandler,
    deletNoteHandler
}
