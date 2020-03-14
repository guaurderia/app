'use strict';

// package references
const express = require('express');

// app references
const OwnerManager = require('../Services/OwnerManager');

// initialization
const ownerManager = new OwnerManager();

// build router

const ownersRouter = () => {
    const router = express.Router();

    router
        .delete('/owners/:id', (request, response) => {

            const { id } = request.params;

            if (!id) {
                response.status(400).send('OwnerId is required');
            } else {
                ownerRepository
                    .removeOwner(id)
                    .then(() => response.status(200).send('Owner deleted'))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send();
                    });
            }
        })
        .get('/owners/:id', (request, response) => {

            const { id } = request.params;

            if (!id) {
                response.status(400).send('OwnerId is required');
            } else {
                ownerRepository
                    .findOwnerById(id)
                    .then(owner => response.json(owner))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send();
                    });
            }
        })
        .get('/owners', (request, response) => {

            const {} = request.query;
            ownerRepository
            .listOwners()
            .then(owners => response.json(owners))
            .catch(error => {                    
                console.log(error);
                response.status(500).send();
            });
            /* if (title) {
                ownerRepository
                    .findNotesByTitle(title)
                    .then(notes => response.json(notes))
                    .catch(error => {                    
                        console.log(error);
                        response.status(500).send();
                    });
            } else if (tag) {
                ownerRepository
                    .findNotesByTag(tag)
                    .then(notes => response.json(notes))
                    .catch(error => {                    
                        console.log(error);
                        response.status(500).send();
                    });
            } else {
                ownerRepository
                    .listOwners()
                    .then(owners => response.json(owners))
                    .catch(error => {                    
                        console.log(error);
                        response.status(500).send();
                    });
            } */
        })
        .post('/owners', (request, response) => {
            console.log(request.body);
            const { name, lastName, dogsId, email, dni } = request.body;

            if (!dni) {
                response.status(400).send('DNI is required');
            } else if (!name) {
                response.status(400).send('Name is required');
            } else if (!email) {
                response.status(400).send('Email is required');
            }else {
                ownerRepository
                    .addOwner(name, lastName, dogsId, email, dni)
                    .then(id => response.status(201).send({ id: id }))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send(error.message);
                    });
            }
        })
        .put('/owners', (request, response) => {

            const { id, name, lastName, dogsId, email, dni } = request.body.owner;
            
            if (!id) {
                response.status(400).send('Id is required');
            } else if (!name) {
                response.status(400).send('Name is required');
            } else if (!lastName) {
                response.status(400).send('Last name is required');
            } else if (!email) {
                response.status(400).send('Email is required');
            } else if (!dni) {
                response.status(400).send('DNI is required');
            } else {
                ownerRepository
                    .updateOwner(id, name, lastName, dogsId, email, dni)
                    .then(() => response.status(200).send())
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send(error.message);
                    });
            }
        })
        .patch('/owners/:id', (request, response) => {

            // not an entirely correct use of patch but convenient 
            // in terms of providing the 'tag' functionality

            const { id } = request.params;
            const { dogsId } = request.body;

            if (!id) {
                response.status(400).send('Id is required');
            } else if (!dogsId) {
                response.status(400).send('Dogs list is required');
            } else {
                ownerRepository
                    .tagOwner(id, dogsId)
                    .then(() => response.status(200).send('Dog list updates'))
                    .catch(error => {
                        console.log(error.message);
                        response.status(500).send();
                    });
            }
        });

    return router;
};

module.exports = ownersRouter;