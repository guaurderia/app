'use strict';

const ObjectID = require('mongodb').ObjectID;
const DbConnection = require('./DbConnection');

const collection = 'owner';

const connect = () => new DbConnection('mongodb://127.0.0.1:27017/owner');

const filters = {
    id: (id) => {
        return { _id: new ObjectID(id) };
    },
    dni: (dni) => {
        return { 'dni': { $regex: new RegExp(dni, 'i') } };
    },
    name: (name) => {
        return { 'name': { $regex: new RegExp(name, 'i') } };
    },
    lastName: (lastName) => {
        return { 'lastName': { $regex: new RegExp(lastName, 'i') } };
    },
    email: (email) => {
        return { 'email': { $regex: new RegExp(email, 'i') } };
    }
};

class OwnerRepository {

    addOwner(owner) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.dni(owner.dni))
                        .then(ownerData => {
                            if (ownerData) {
                                connection.close();
                                reject(Error('Usuario ya registrado'));
                            } else {
                                connection.Db
                                    .collection(collection)
                                    .insertOne(owner)
                                    .then(result => {
                                        connection.close();
                                        resolve({ id: result.insertedId });
                                    })
                                    .catch(error => {
                                        connection.close();
                                        reject(error);
                                    });
                            }
                        })
                        .catch(error => {
                            connection.close();
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findOwnerById(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.id(id))
                        .then(owner => {
                            resolve(owner);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findOwnerByDni(dni) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.dni(dni))
                        .then(owner => {
                            resolve(owner);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findOwnerByName(name) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.name(name))
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(owner => {
                            resolve(owner);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }

    findOwnerByLastName(lastName) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.lastName(lastName))
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(owner => {
                            resolve(owner);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }

    findOwnersByEmail(email) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.email(email))
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(owners => {
                            resolve(owner);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    listOwners() {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find()
                        //TODO: Sort alphabetically instead of last modified.
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(owners => {
                            resolve(owner);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => reject(error));
        });
    }


    removeOwner(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndDelete(filters.id(id))
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }


    tagOwner(dni, dogsId) {
        const connection = connect();

        const update = {
            $addToSet: {
                dogsId: {
                    $each: dogsId
                }
            }
        };

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndUpdate(
                            filters.dni(dni),
                            update
                        )
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    updateOwner(id, owner) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .update(
                            filters.id(id),
                            {
                                $set: {
                                    dogsId: owner.dogsId,
                                    name: owner.name,
                                    lastName: owner.lastName,
                                    email: owner.email,
                                    dni: owner.dni,
                                    updated_date: owner.updated_date
                                }
                            })
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }
}

module.exports = OwnerRepository;