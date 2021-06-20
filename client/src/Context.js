import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
/**
 * A higher-order component (HOC) that shares functionality 
 * across the components of the app. This will let you reuse 
 * component logic and state. Remember - "Context" is used in 
 * React when data needs to be accessible by many components at different nesting levels.
 */
const Context = React.createContext(); 

//Context allows changes to be made and passed through as props throughout the components
export class Provider extends Component {

  //will either remember the authenticated user or identify a non-auth user
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    //value represents an object containing the context to be shared throughout the component tree.
    return (
      <Context.Provider value={value}>  
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
      user.emailAddress = emailAddress;
      user.password = password;
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
