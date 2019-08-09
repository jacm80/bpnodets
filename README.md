# bpNodeTs

This boilerplate has the purpose of being taken as a reference for the creation of projects with typescript, NodeJS, express, typeORM. It has all the configuration of the basic cases in any application such as the configuration of typeORM, express, auth 2.0 and the structure of folders with an organization of controllers, models, routes, environments, configuration and tests.

I would appreciate any comments. The idea is to improve it and contribute to the community.

You are free to use it, it has MIT license.

## Project Structure

The configuration files are in the root folder (bpnodets), and it has the following folders

Folder | Description
-------|-------------
config | settings files, licence, eslintrc, ormconfig, package.json, tsconfig, gitignore, example.env
postman_collections | postman files, to test api rest
src | app main structure, folders: app, entity, features, helpers, migration, routes
src/app | express settings
src/entity | typeORM entities
src/features | application functionalities, users that is something basic for any project.
src/features/users | user functionalities
src/features/users/controllers | controllers action encapsulation
src/features/users/dao | data access object, typeorm repository objects
helpers | utilities used by any module of the application
migration | used migrators with typeorm.
routes | configuration of application paths.

# App Installation

1. Download code from repository 
2. install dependencies: npm install | yarn

# Run app

* yarn start | npm run start 

...
