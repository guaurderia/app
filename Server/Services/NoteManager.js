'use strict';

const OwnerRepository = require('../DataAccess/OwnerRepository');
const assert = require('assert');
const ownerRepository = new OwnerRepository();

const mapToOwnerDto = (owner) => {
    assert(owner, 'Owner is required');

    return {
        id: owner._id,
        dogsId: owner.dogsId,
        name: owner.name,
        lastName: owner.lastName,
        email: owner.email,
        dni: owner.dni,
        createdDate: owner.created_date,
        updatedDate: owner.updated_date
    };
};

const createUpdatedOwner = (title, content, tags) => {
    return { 
        title: title, 
        content: content,
        tags: !Array.isArray(tags) ? convertTagsCsvToArray(tags) : tags,
        updated_date: new Date() 
    };
};

const createNewNote = (title, content, tags) => {
    return {
        title: title,
        content: content,
        tags: convertTagsCsvToArray(tags),
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

class NoteManager {    

    addNote(title, content, tags) {

        assert(title, 'Title is required');
        assert(content, 'Content is required');
        
        const note = createNewNote(title, content, tags);

        return new Promise((resolve, reject) => {
            ownerRepository
                .addNote(note)
                .then(result => resolve(result.id))
                .catch(error => reject(error));
        });
    }


    findNoteById(id) {
        
        assert(id, 'Id is required');
        
        return new Promise((resolve, reject) => {
            ownerRepository
                .findNoteById(id)
                .then(note => resolve(mapToNoteDto(note)))
                .catch(error => reject(error));
        });
    }


    findNotesByTag(tag) {
        
        assert(tag, 'Tag is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .findNotesByTag(tag)
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }


    findNotesByTitle(title) {
        
        assert(title, 'Title is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .findNotesByTitle(title)
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }


    listNotes() {
        return new Promise((resolve, reject) => {
            ownerRepository
                .listNotes()
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }


    removeNote(id) {

        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            ownerRepository
                .removeNote(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    tagNote(id, tags) {
        
        assert(id, 'Id is required');
        assert(tags, 'Tags are required');

        var exp = new RegExp(/^([\w]+[,]?)*$/);
        assert(exp.test(tags), 'Invalid list of tags specified');

        const uniqueTags = tags ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase()))) : [];

        return new Promise((resolve, reject) => {
            ownerRepository
                .tagNote(id, uniqueTags)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    updateNote(id, title, content, tags) {
        assert(id, 'Id is required');
        assert(title, 'Title is required');
        assert(content, 'Content is required');
        
        const note = createUpdatedNote(title, content, tags);

        return new Promise((resolve, reject) => {
            ownerRepository
                .updateNote(id, note)
                .then(() => resolve())
                .catch(error => reject(error));
        });        
    }
}

module.exports = NoteManager;