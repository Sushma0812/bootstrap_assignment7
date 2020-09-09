# Contact Book

## Problem Statement

Contact book app is keep track of all the contacts. We can add a person with his details like name, contact number, address to contact book. We can search for any contact by name, contact number and address. Design the pages using bootstrap.

## Know your APIs

- POST   - <http://localhost:3000/contacts/>      - add a new contact
- GET    - <http://localhost:3000/contacts/?_sort=id&_order=asc>  - get all existing contacts sorted by id
- PUT    - <http://localhost:3000/contacts/id:>   - update existing contacts
- DELETE - <http://localhost:3000/contacts/id:>   - delete the specified contact

## TECH STACK

- Angular8
- Jasmine
- Protractor
- json-server

## PREREQUISITES

  1. Install dependencies npm install
  2. Run the frontend `npm run start` which shall run on port:4200  
  3. Use `json-server --watch db.json` for APIs availabilty using json-server

## Instructions

1. Your are expected to write code in the given boilerplate so that you can complete this assignment
2. All the detailed instructions are given inside the project
3. Understand the comments in the project and write code
4. After writing the code end-to-end test by running `npm run e2e` or `ng e2e`.
