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
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  /**
   * The options object, for example, sends a request with the HTTP method, as well 
   * as the request headers and a stringified body
   */

  /**
   * getUser() makes a GET request to the /users endpoint,
   * and returns a JSON object containing user credentials. 
   */
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
  
  /**
   * And createUser() makes a POST request, 
   * sending new user data to the /users endpoint
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", 
    'POST', 
    course, 
    true,
     {
       emailAddress, 
       password
      });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  
}
