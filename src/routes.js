const { addNoteHandler, getAllNotesHandler, getNoteByIDHandler, editNoteHandler, deletNoteHandler } = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIDHandler
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deletNoteHandler
    }
]

module.exports = routes
