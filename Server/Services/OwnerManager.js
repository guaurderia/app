'use strict';

const OwnerRepository = require('../DataAccess/OwnerRepository');
const assert = require('assert');
const ownerRepository = new OwnerRepository();

const mapToOwnerDto = (owner) => {
    assert(owner, 'Owner is required');

    return {
        id: owner._id,
        name: owner.name,
        lastName: owner.lastName,
        dogsId: owner.dogsId,
        email: owner.email,
        dni: owner.dni,
        createdDate: owner.created_date,
        updatedDate: owner.updated_date
    };
};

const createUpdatedOwner = (name, lastName, dogsId, email, dni) => {
    return { 
        name: name,
        lastName: lastName,
        email: email,
        dni: dni,
        //TODO: Ask front layer to provide dogsId as a list.
        dogsId: !Array.isArray(dogsId) ? convertTagsCsvToArray(dogsId) : dogsId,
        updated_date: new Date() 
    };
};

const createNewOwner = (name, lastName, dogsId, email, dni) => {
    return {
        name: name,
        lastName: lastName,
        email: email,
        dni: dni,
        //TODO: Ask front layer to provide dogsId as a list.
        dogsId: convertTagsCsvToArray(dogsId),
        created_date: new Date(),
        updated_date: new Date()
    };
};

const convertTagsCsvToArray = (tags) => {
    
    var exp = new RegExp(/^((\w+)((,)?|(,\s)))*$/);
    assert(exp.test(tags), 'Invalid list of tags specified');
    
    return tags 
        ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase()))) 
        : [];
};

class OwnerManager {    

    addOwner(name, lastName, dogsId, email, dni) {

        assert(name, 'Name is required');
        assert(lastName, 'Last name is required');
        assert(email, 'Email is required');
        assert(dni, 'DNI is required');
        
        const owner = createNewOwner(name, lastName, dogsId, email, dni)

        return new Promise((resolve, reject) => {
            ownerRepository
                .addOwner(owner)
                .then(result => resolve(result.id))
                .catch(error => reject(error));
        });
    }


    findOwnerById(id) {
        
        assert(id, 'Id is required');
        
        return new Promise((resolve, reject) => {
            ownerRepository
                .findOwnerById(id)
                .then(owner => resolve(mapToOwnerDto(owner)))
                .catch(error => reject(error));
        });
    }


    findOwnerByDni(dni) {
        
        assert(dni, 'DNI is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .findOwnerByDni(dni)
                .then(owner => resolve(mapToOwnerDto(owner)))
                .catch(error => reject(error));
        });
    }
    

    findOwnersByName(name) {
        
        assert(name, 'Name is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .findOwnersByName(name)
                .then(owners => resolve(owners.map(owner => mapToOwnerDto(owner))))
                .catch(error => reject(error));
        });
    }
    

    findOwnersByLastName(lastName) {
        
        assert(name, 'Last name is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .findOwnersByLastName(lastName)
                .then(owners => resolve(owners.map(owner => mapToOwnerDto(owner))))
                .catch(error => reject(error));
        });
    }


    findOwnerByEmail(email) {
        
        assert(email, 'Email is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .findOwnerByDni(lastName)
                .then(owners => resolve(owners.map(owner => mapToOwnerDto(owner))))
                .catch(error => reject(error));
        });
    }


    listOwners() {
        return new Promise((resolve, reject) => {
            ownerRepository
                .listOwners()
                .then(owners => resolve(owners.map(owner => mapToOwnerDto(owner))))
                .catch(error => reject(error));
        });
    }


    removeOwner(id) {

        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .removeOwner(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    tagOwner(dni, dogsId) {
        
        assert(dni, 'DNI is required');
        assert(dogsId, 'Dogs list are required');

        var exp = new RegExp(/^([\w]+[,]?)*$/);
        assert(exp.test(dogsId), 'Invalid list of dogs specified');

        const uniqueDogs = tags ? Array.from(new Set(dogsId.split(',').map(dogId => dogId.toLowerCase()))) : [];

        return new Promise((resolve, reject) => {
            ownerRepository
                .tagOwner(dni, uniqueDogs)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    updateOwner(id, updateOwner) {
        assert(id, 'Id is required');
        assert(name, 'Name is required');
        assert(lastName, 'Last name is required');
        assert(email, 'Email is required');
        assert(dni, 'DNI is required');
        
        const owner = createUpdatedOwner(name, lastName, dogsId, email, dni);

        return new Promise((resolve, reject) => {
            ownerRepository
                .updateOwner(id, owner)
                .then(() => resolve())
                .catch(error => reject(error));
        });        
    }
}

module.exports = OwnerManager;