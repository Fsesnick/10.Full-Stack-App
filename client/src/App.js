    // src/App.js
    import CourseListing from './components/courseListing';
    import React, {Component} from 'react';
   
    class App extends Component {

        
        state = {
          courses:[]
        }
    

      componentDidMount() {

        fetch('http://localhost:5000/api/courses', {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('joe@smith.com:joepassword')}})
        .then(response => response.json())
        .then((data) => {
          this.setState({ courses: data })
        })
        .catch(console.log);
        
      }

      render () {
        return (
          <CourseListing courses={this.state.courses}/>
        );
      }
    }
    
    export default App;


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