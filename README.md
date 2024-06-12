# c4c-dashboard-2024
C4C dashboard challange

## Instructions for how to start your application
1. npm install
2. npm start
3. go to http://localhost:3000/

## A high-level overview of the application

Features:
- Add Organizations: Users can submit information about organizations, including name, logo URL, description, and active status. When the user fills out and submits the form it sends a POST request to the /submit route. The information the user entered is used to create a new organization object which is then inserted in the MongoDB database. 
- View Organizations: Displays a list of organizations with their details. 
- Delete Organizations: Allows users to delete organizations from the database using a delete button. When the user deletes an organization the organization's ID is extracted and then used to find and delete the correct organization using the /delete route.

Technologies:
- Node.js and express are used in the backend
- MongoDB is used to store and handle data
- EJS is the templating engine

## Design decisions
## Short reflection
