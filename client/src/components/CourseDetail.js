import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 *  - /courses/:id route
 *  - retrieves detail /api/courses/:id route
 *  - renders "Delete Course"  /api/courses/:id route
 *  - renders "Update Course" 
 */
export default class CourseDetail extends Component {
  state = {
    // fetched data goes here
    course: [],
    user: [],
    errors: [],
  };

  deleteCourse = () => {
    // context is the authenticated user
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const authUserEmail = authUser.emailAddress;
    const authUserPassword = authUser.password;
    const id = this.props.match.params.id;
    const { title } = this.state;

    context.data
      .deleteCourse(id, authUserEmail, authUserPassword)
      .then((errors) => {
        if (errors) {
          this.setState({ errors });
          return {
            errors: [`Course ${title} was not deleted from the database.`],
          };
        } else {
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api${this.props.match.url}`)
      .then((data) => {
        this.setState({ course: data.data, user: data.data.User });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        this.props.history.push('/notfound');
      });
  }

  render() {
    const { context } = this.props;
    const result = this.state.course;
    const authUser = context.authenticatedUser;
    const { user } = this.state;

    return (
      <div>
        <div className='actions--bar'>
          <div className='wrap'>
            {authUser && authUser.emailAddress === user.emailAddress ? (
              <React.Fragment>
                 <span>
                    <Link
                      className='button'
                      to={`/courses/${result.id}/update`}
                    >
                      Update Course
                    </Link>
                    <Link
                      className='button'
                      to='/courses'
                      onClick={this.deleteCourse}
                    >
                      Delete Course
                    </Link>
                  </span>
                  <Link className='button button-secondary' to='/'>
                    Return to List
                  </Link>
                </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className='button button-secondary' to='/'>
                  Return to List
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className='wrap'>
        <h2>Course Detail</h2>
        <div>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className='course--detail--title'>Course</h3>
                    <h4 className='course--name'>{result.title}</h4>
                    <p>{user.firstName} {user.lastName} </p>
                    <ReactMarkdown children={result.description} />
                </div>
                <div>
                <h3 className='course--detail--title'>Estimated Time </h3>
                    <ReactMarkdown children={result.estimatedTime} />
                    <h3 className='course--detail--title'>Materials Needed  </h3>
                    <ul className="course--detail--list">
                    <ReactMarkdown children={result.materialsNeeded} />
                    </ul>
                 </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}