import axios from 'axios'
const baseUrl = 'http://localhost:3002/people'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {return response.data})
}

const addPerson = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => {return response.data}) 
}

const update = (personId, personObject) => {
    const request = axios.put(`${baseUrl}/${personId}`, personObject)
    return request.then(response => {return response.data})
}

const deletePerson = (personId) => {
    console.log(`${baseUrl}/${personId}`)
    axios.delete(`${baseUrl}/${personId}`)
    return getAll()
}

export default {
    getAll, 
    addPerson,
    update,
    deletePerson
}