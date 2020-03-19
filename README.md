[![Build Status](https://travis-ci.org/guaurderia/app.svg?branch=master)](https://travis-ci.org/guaurderia/app)

- [Guaurderia](#guaurderia)
  - [Features](#features)
  - [High Level Design](#high-level-design)
  - [Tools](#tools)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [MongoDB Setup](#mongodb-setup)
      - [Install and Host MongoDB Locally](#install-and-host-mongodb-locally)
      - [Install And Host Using Docker](#install-and-host-using-docker)
        - [Run MongoDB Using Named Volume](#run-mongodb-using-named-volume)
        - [Run MongoDB Using Bind Mount](#run-mongodb-using-bind-mount)
      - [Third Party Hosting](#third-party-hosting)
        - [MongoDB Atlas](#mongodb-atlas)
        - [MLab](#mlab)
  - [Install](#install)
    - [Server](#server)
      - [Build server](#build-server)
    - [Client](#client)
  - [Versioning](#versioning)
  - [Authors](#authors)

# Guaurderia

Guaurderia app uses a [ReactJS] frontend to capture and manage assistance, an api written in [ReactJS], and [MongoDB] to store data.

## Features

* Add admin

## High Level Design

<img src="./client/public/img/data_structure_v2.png" width="60%" height="60%" />

---

## Tools

* [NodeJS] - Javascript runtime
* [MongoDB] - NoSQL database
* [ReactJS] - Javascript library for building user interfaces

---

## Getting Started

These instructions will get your app up and running.

### Prerequisites

The following software is required to be installed on your system:

* NodeJS

  The following version of Node and Npm are required:

  * Node 8.x
  * Npm 3.x

  Type the following commands in the terminal to verify your node and npm versions

  ```bash
  node -v
  npm -v
  ```

* MongoDB

  MongoDB 3.x is required

  Type the following command to verify that MongoDB is running on your local machine

  ```bash
  mongo -version
  ```

  See alternative MongoDB options below

### MongoDB Setup

A running instance of MongoDB is required. Alternatively use a hosted MongoDB from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [MLab](https://mlab.com/)

One of the 3 options below is recommended to get up and running with MongoDB:

* Install and host locally
* Install and host in Docker
* Register for third party MongoDB hosting
  * Register for and use MongoDB Atlas (Database As A Service)
  * Register for and use MLab (Database As A Service)

#### Install and Host MongoDB Locally

Installing MongoDB is relatively straight forward. There are currently 3 platform (Windows, Linux, OSX) releases available and can be found here

For more specific installation instructions, please see the following links:

* [Install MongoDB On Linux](https://docs.mongodb.com/v3.0/administration/install-on-linux/)

* [Install MongoDB On Windows](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-windows/)

* [Install MongoDB On OSX](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/)

#### Install And Host Using Docker

##### Run MongoDB Using Named Volume

To run a new MongoDB container, execute the following command from the CLI:

```docker
docker run --rm --name mongo-dev -p 127.0.0.1:27017:27017 -v mongo-dev-db:/data/db -d mongo
```

CLI Command | Description
--- | ---
--rm | remove container when stopped
--name mongo-dev | give container a custom name
-p | map host port to container port
-v mongo-dev-db/data/db | map the container volume 'data/db' to a custom name 'mongo-dev-db'
-d mongo | run mongo container as a daemon in the background

##### Run MongoDB Using Bind Mount

```bash
cd
mkdir -p mongodb/data/db
docker run --rm --name mongo-dev -p 127.0.0.1:27017:27017 -v ~/mongodb/data/db:/data/db -d mongo
```

CLI Command | Description
--- | ---
--rm | remove container when stopped
--name mongo-dev | give container a custom name
-p | map host port to container port
-v ~/mongodb/data/db/data/db | map the container volume 'data/db' to a bind mount '~/mongodb/data/db'
-d mongo | run mongo container as a daemon in the background

#### Third Party Hosting

##### MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is basically a database as a service and is hosted in the cloud. That means that you don't need to install or setup anything to start using MongoDB.

You can get started for free by registering [here](https://www.mongodb.com/cloud/atlas). The free tier entitles you to 512MB storage.

Please review the documentation [here](https://docs.atlas.mongodb.com/)

##### MLab

[MLab](https://mlab.com/) also provides MongoDB cloud hosting in the form of database as a service. Once again there is no installation or setup required.

To get started, signup for free account [here](https://mlab.com/signup/). The free tier entitles you to 500MB storage.

Please review the documentation [here](https://docs.mlab.com/)

## Install

Follow the following steps to get development environment running.

1. Clone 'guaurderia/app' repository from GitHub

   ```bash
   git clone https://github.com/guaurderia/app.git
   ```

   _or using ssh_

   ```bash
   git clone git@github.com:guaurderia/app.git
   ```


### Server

To start app server, you just need to run this commands:

#### Build server

   ```bash
   cd server
   npm install
   npm start
   ```


[Optional]

To change the default server behaviour you can create an `.env` file in server root path to declarte the server variables:

  ```bash
  vim .env
  ```
  Example of server variables:

  ```bash PORT=3000 DBURL=mongodb://localhost/guaurderia
  ```

  Once `.env` file is in place, to start the server follow [build instructions](#Build-server)


### Client

To start the app, follow the next instructions:

  Start React app

  ```javascript
  cd client
  npm install
  npm start
  ```

---

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/drminnaar/noteworx-react-mongodb/tags).

## Authors

* **Román Mendez Beck** - [romanmendez](https://github.com/romanmendez)
* **Alicia Doblas Alaez** - [adoblas](https://github.com/adoblas)
