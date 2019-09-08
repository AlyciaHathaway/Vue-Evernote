import request from '@/helpers/request'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: 'notebooks/:id',
    DELETE: 'notebooks/:id'
}

export default {
    getAll() {
        return request(URL.GET)
    },
    updateNote(noteID, { title = '' } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', noteID), 'PATCH', { title })
    },
    deleteNote(noteID) {
        return request(URL.DELETE.replace(':id', noteID), 'DELETE')
    },
    addNote({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    }
}