import request from '@/helpers/request'
import { dateFormat } from '@/helpers/util'

const URL = {
    GET: '/notes/from/:notebookID',
    ADD: '/notes/to/:notebookID',
    UPDATE: '/notes/:noteID',
    DELETE: '/notes/:noteID'
}

export default {
    getAll({ notebookID }) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookID', notebookID))
                .then(response => {
                    response.data = response.data.map(note => {
                        note.createdAtDate = dateFormat(note.createdAt)
                        note.updatedAtDate = dateFormat(note.updatedAt)
                        return note
                    }).sort((note1, note2) => {
                        return note1.updatedAt < note2.updatedAt
                    })
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    },
    updateNote({ noteID }, { title, content }) {
        return request(URL.UPDATE.replace(':noteID', noteID), 'PATCH', { title, content })
    },
    deleteNote({ noteID }) {
        return request(URL.DELETE.replace(':noteID', noteID), 'DELETE')
    },
    addNote({ notebookID }, { title = '', content = '' } = { title: '', content: '' }) {
        return request(URL.ADD.replace(':notebookID', notebookID), 'POST', { title, content })
    }
}