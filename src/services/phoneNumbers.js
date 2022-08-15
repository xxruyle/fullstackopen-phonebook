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

export default {
    getAll, 
    addPerson
}