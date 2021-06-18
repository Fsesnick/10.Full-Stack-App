import React from 'react';
//import {Link} from 'react-router-dom';

const CourseListing =({courses}) => {
    return (
      <div>
        <center><h1>Courses</h1></center>
        {courses.map((course) => (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{course.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{course.description}</h6>
              <p class="card-text">{course.materialsNeeded}</p>
            </div>
          </div>
        ))}
      </div>
    )
  };

export default CourseListing;