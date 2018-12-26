import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import {fetchAccount} from "../../store/actions/login"

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '',
    password: '', errorMsg:""};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(){

    if(this.props.user!==null){  
      if(this.props.user.username === this.state.username && this.props.user.password === this.state.password){
        this.props.history.push({
          pathname: "/dashboard"
        })
      }
   }
  }

  handleChange = prop => event => {
   
    this.setState({ [prop]: event.target.value });
  };
  register = ()=>{
    this.props.history.push({
      pathname: "/register"
    })
  }

  render() { 
    let {username, password} = this.state;
    let {loading, error, success} = this.props;

   
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>UserName</label>
            <input type="text" name="username" required onChange={this.handleChange("username")} value={username} className="form-control" placeholder="Enter user name"/>
           
          </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" required onChange={this.handleChange("password")} value={password} className="form-control" placeholder="Password"/>
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary">Submit</button>  <button type="button" className="btn btn-primary" onClick={this.register}>Register</button>
        </div>
      
      <div className="message">
      
      {this.state.errorMsg!=="" && <div>{this.state.errorMsg}</div>}
      {success===false && <div>Wrong credentials...</div>} 
      { loading && <div>Please wait...</div> }
      { error && <div>{error}</div> }
     </div>
      </form>
    )
  }

  

  onSubmit(e) {
    
    e.preventDefault();
    let { username, password } = this.state;
    this.props.login(username, password);
    
  }
}
LoginForm.propTypes = {
  user:PropTypes.shape({
    username:PropTypes.string,
    password:PropTypes.string,
    
  }),
  success:PropTypes.bool,
  location:PropTypes.shape({
    state:PropTypes.shape({
      message:PropTypes.string
    })
    
  })
}

const mapStateToProps = (state) => {
  return {
    loading: state.loginData.loading,
    error: state.loginData.error,
    user: state.loginData.user,
    success: state.loginData.success,
  };
}

const mapDispatchToProps = { login: fetchAccount};

let connecteRouter = withRouter(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(connecteRouter);