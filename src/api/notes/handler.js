class NotesHandler {
    constructor(service) {
        this._service = service
    }

    postNoteHandler(request, h) {
        try {
            const { title = "untitled", body, tags } = request.payload

            const noteId = this._service.addNote({ title, body, tags })

            const respose = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId
                }
            })
            respose.code(201)
            return respose
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            })
            response.code(400)
            return response
        }
    }

    getNotesHandler() {
        const notes = this._service.getNotes()
        return {
            status: 'success',
            data: {
                notes
            }
        }
    }

    getNoteByIdHandler(request, h) {
        try {
            const { id } = request.params

            const note = this._service.getNoteById(id)

            return {
                status: "success",
                data: {
                    note
                }
            }
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            })
            response.code(404)
            return response
        }
    }

    putBoteByIdHandler(request, h) {
        try {
            const { id } = request.params

            this._service.editNoteById(id, request.payload)

            return {
                status: "success",
                message: "Catatan berhasil diperbarui"
            }
        } catch (error) {
            const response = h.response({
                status: "fail",
                message: error.message
            })
            response.code(404)
            return response
        }
    }

    deleteNoteById(request, h) {
        try {
            const { id } = request.params

            this._service.deleteNoteById(id)

            return {
                status: "success",
                message: "Catatan berhasil dihapus"
            }
        } catch (error) {
            const response = h.response({
                status: "fail",
                message: error.message
            })
            response.code(404)
            return response
        }
    }
}

module.exports = NotesHandler
