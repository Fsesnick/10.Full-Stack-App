# 10.Full-Stack-App
The full stack application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.  In addition, the project will require users to create an account and sign in to make changes to the database.<br/>

### api 
REST API, will be hosted separately from the React application at http://localhost:5000/.<br/>
### client 
React application, will be using the create-react-app development server, which will host the application (by default) at http://localhost:3000/.<br/>  

While both the React and REST API applications will be using the same hostname, localhost, their port numbers differ, so the browser will treat them as separate origins or domains.

RUN: <br/>

```bash
npm install 
```
and
```bash
npm start
```

This aplication uses [BasicAuth](https://www.npmjs.com/package/basic-auth), [Axios](https://www.npmjs.com/package/axios), [CORS](https://www.npmjs.com/package/cors),[sequelize](https://www.npmjs.com/package/sequelize), [bcrypt](https://www.npmjs.com/package/bcrypt),[express](https://expressjs.com/en/starter/generator.html)
