import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
/**
 * If the user is authenticated, the component specified in <PrivateRoute>'s component prop gets rendered.

If the user not authenticated, redirect to /signin:
 */
// Este componente faz rotas privadas apenas para usuários autenticados usarem para atualizar, criar e excluir curso 
const privateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
    {context => (
      <Route {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
  )}
  </Consumer>
);
};

export default privateRoute