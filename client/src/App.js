// Renders the router that wraps the components of the app.
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NotFound from './components/NotFound';
import Header from "./components/Header";
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";
import Courses from "./components/Courses";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import CourseDetail from "./components/CourseDetail";
//import DeleteCourse from "./components/DeleteCourse";
import CreateCourse from "./components/CreateCourse";
//import UpdateCourse from "./components/UpdateCourse";
import './styles/global.css';

//conecta componentes com contexto e as mudanças que vêm junto com o contexto 
const UserSignUpWithContext = withContext(UserSignUp); 
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
//const DeleteCourseWithContext = withContext(DeleteCourse);
const CreateCourseWithContext = withContext(CreateCourse);
//const UpdateCourseWithContext = withContext(UpdateCourse);

const routes = () => (
  <Router>
    <div>
    <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute exact path="/courses/create"  component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/notfound" component={NotFound}/>
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default routes

/*


  .then(json => console.log(json))
import './App.css';
import React, {Component, Fragment} from 'react';
import CourseListing from './courseListing';
import axios from 'axios';


const url = "http://localhost:5000/api/courses"
class App extends Component {

  constructor(props){
    super(props)

    this.state={
      courses:''
    }
  }

  render(){
    return(

      <React.Fragment>
        <h1>courses</h1>
       <CourseListing courselist={this.state.courses}></CourseListing>
      </React.Fragment>
    );
  }

  componentDidMount(){
  axios.get(url,{
    auth:{
      username: "joe@smith.com" ,
      password: "joepassword"
    },
  })
  .then(res =>{
    this.setState({
      courses: res.title
    });
  });

  
  }


}

export default App;
          <div class="card">
          <div class="card-body">
            <h5 class="card-title">Steve Jobs</h5>
            <h6 class="card-subtitle mb-2 text-muted">steve@apple.com</h6>
            <p class="card-text">Stay Hungry, Stay Foolish</p>
          </div>
        </div>
*/