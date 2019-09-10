import request from '@/helpers/request'
import { dateFormat } from '@/helpers/util'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: 'notebooks/:id',
    DELETE: 'notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET)
                .then(response => {
                    response.data = response.data.sort((note1, note2) => note1.createdAt < note2.createdAt)
                    response.data.map(note => {
                            note.dateFormat = dateFormat(note.createdAt)
                        })
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
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