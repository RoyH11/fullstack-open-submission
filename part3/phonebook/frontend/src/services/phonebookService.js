import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    const nonExistingPerson = {
        name: 'Non-existing Person',
        number: '000-000-0000',
        id: "999999"
    }

    const nonExistingPersonValidId = {
        name: 'Non-existing Person Valid ID',
        number: '111-111-1111',
        id: "999999999999999999999999"
    }
    // return request.then(response => response.data); 
    return request.then(response => response.data.concat(nonExistingPerson, nonExistingPersonValidId)); // testing graceful deletion
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