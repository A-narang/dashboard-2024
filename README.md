# c4c-dashboard-2024
C4C dashboard challange

## Instructions for how to start your application
1. npm install
2. npm start
3. go to http://localhost:3000/

## A high-level overview of the application

Features:
- Add Organizations: Users can submit information about organizations, including name, logo URL, description, and active status. When the user fills out and submits the form it sends a POST request to the /submit route. The information the user entered is used to create a new organization object which is then inserted in the MongoDB database. The main page is also reloaded to reflect the new changes.
- View Organizations: Displays a list of organizations with their details. 
- Delete Organizations: Allows users to delete organizations from the database using a delete button. When the user deletes an organization the organization's ID is extracted and then used to find and delete the correct organization using the /delete route.

Technologies:
- Node.js and express are used in the backend
- MongoDB is used to store and handle data
- EJS is the templating engine

## Short reflection
I learned a lot from this project. I had very little experience working with databases before this project so I enjoyed learning how MongoDB worked. I also learned about endpoints and how to handle form submissions. When I was working on the delete button I learned the importance of having the object id to delete the correct organization. If I had more time I would've liked to try to create an update button and learn how to create the route for that as well.
