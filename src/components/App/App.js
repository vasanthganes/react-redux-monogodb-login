import React,{ Component } from 'react';
import { Route, Router ,Switch, Redirect} from "react-router-dom";
import { history } from "../../store/store";
import { connect } from 'react-redux';
import "../../css/style.css"

//components

import LoginForm from "../LoginForm/LoginForm";
import Dahboard from "../Dashboard/Dashboard";
import RegisterForm from "../Register/RegisterForm";


  const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = rest;
  
    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{pathname: '/',state: { message: "" }}}/>
        )
      )}
      />
    );
  };

  
class App extends Component {

    render(){
       
        return ( <div className="main"><Router history={history}>
         <Switch>
            <Route exact path="/"  component={LoginForm} />
            <Route exact path="/register"  component={RegisterForm} />
            <PrivateRoute path='/dashboard' component={Dahboard} isAuthenticated={this.props.loggedIn}  />
         </Switch>
        </Router></div>);
    }

}

  
const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginData.loggedIn
    };
  }
  
  const mapDispatchToProps = {};

  
  export default connect(mapStateToProps, mapDispatchToProps)(App);