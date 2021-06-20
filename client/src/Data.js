import config from './config';
/**
 * Contains a class of Data with the API authentication utility 
 * methods you will use to create, sign up and authenticate a user. 
 * The file is mostly pre-written,
 * making GET and POST requests to the REST API, for example.
 */
 export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);// btoa() method creates a base-64 encoded ASCII string from a "string" of data
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      console.log('user successfully created');
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {
      emailAddress,
      password,
    });
    console.log(response);
    if (response.status === 201) {
      console.log('course successfully created');
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }
 
  
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      console.log(`course successfully updated by ${emailAddress}`);
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      console.log(`course successfully deleted by ${emailAddress}`);
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  async getCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'GET', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      console.log('Course was successfully fetched!');
      return response.json().then((data) => data);
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }
}
