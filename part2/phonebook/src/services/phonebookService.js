import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    const nonExistingPerson = {
        name: 'Non-existing Person',
        number: '000-000-0000',
        id: "999999"
    }
    // return request.then(response => response.data); 
    return request.then(response => response.data.concat(nonExistingPerson)); // testing graceful deletion
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
    return request.then(response => response.data);
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default { getAll, create, update, remove };