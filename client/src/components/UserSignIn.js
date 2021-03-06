import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

//Components creates the user sign page in whenever a element on the page requires a user
class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
      }

      render() {
        const {
          emailAddress,
          password,
          errors
        } = this.state;

        //Renders the component according to the markup
      return(
        <div className="form--centered">
        <h2>Sign In</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
            <label> Email Address
              <input 
                id="emailAddress" 
                name="emailAddress" 
                type="text"
                value={emailAddress} 
                onChange={this.change} 
                placeholder="Email" />
                </label>
              <label> Password 
              <input 
                id="password" 
                name="password"
                type="password"
                value={password} 
                onChange={this.change} 
                placeholder="Password" />    
                </label>            
            </React.Fragment>
          )} />
        <p>
          Don't have a user account? <Link to="/signup">Click right here</Link> to sign up!
        </p>
      </div>
      )
}

change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState( () => {
        return {
            [ name ]: value
        }
    })
}

//Checks for authenticated user
submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
        .then( (user) => {
            if (user === null) {
            this.setState(() => {
            return {errors: [ 'Sign-in was unsucessful']};
            });
            } else {
                this.props.history.push(from);
                console.log(user);
    
            }
        })
        .catch( (error) => {
            console.error(error);
            this.props.history.push('/error');
        })
}

cancel = () => {
    this.props.history.push('/');
}
}

export default UserSignIn