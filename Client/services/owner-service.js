'use strict';


// package references


import * as axios from 'axios';


// db options


const baseApiUrl = 'http://localhost:8000/api';


// add note
const addOwner = (name, lastName, dogsId = [], email, dni) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/owners`, { 
                'name': name,
                'lastName': lastName,
                'dogsId': dogsId.join(),
                'email': email,
                'dni': dni})
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });

    });

};


// find notes


const findOwnerById = (id) => {
    
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/owners/${id}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};
/* 

const findNotesByTitle = (title) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/notes?title=${title}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

}; */

const listOwners = () => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/owners`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// remove note


const removeOwner = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/owners/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// update note


const updateOwner = (owner) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseApiUrl}/owners`, {owner})
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};


// exports


module.exports = {
    'addOwner': addOwner,
    'findOwnerById': findOwnerById,
/*     'findNotesByTitle': findNotesByTitle,*/
    'listOwners': listOwners,
    'removeOwner': removeOwner,
    'updateOwner': updateOwner
};