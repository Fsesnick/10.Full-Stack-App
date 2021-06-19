import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Creates an index of courses as the homepage
class Courses extends Component {
    state = {
        courses: []
    }

    //Fetches to the API to get a list of courses
    componentDidMount() {
        fetch('http://localhost:5000/api/courses')
        .then(data => data.json())
        .then( response => { 
            this.setState({
                courses: response
            });
        });
    }

render() {
    return (
    <div>
        <div className="wrap main--grid">
            {this.state.courses.map(course =>
            <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
            </Link>
            )}
            <Link className="course--module course--add--module" to='/courses/create'>
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </span>
            </Link>  
        </div>
    </div>
        )
      }
    }

    





export default Courses