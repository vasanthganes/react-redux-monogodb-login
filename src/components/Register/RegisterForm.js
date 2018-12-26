import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import {postRegister} from "../../store/actions/register"

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '',
    password: '',email:"", first_name:"", last_name:"", gender:"male",country:"india"};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(){

    if("success" in this.props.user){  
      
      if(this.props.user.success === true ){
        this.props.history.push({
          pathname: "/",
          state: { message: "Registered Successfully..." }
        })
      }else if(this.props.user.success === false ){
        alert("Registered failed try diffrent username...")
      }
   }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  login = ()=>{
    this.props.history.push({
      pathname: "/"
    })
  }
  
  render() { 
    let {username, password,email, first_name, last_name, gender,country} = this.state;
    let {loading, error} = this.props;
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
          <label>Email</label>
          <input type="email" name="email" required onChange={this.handleChange("email")} value={email} className="form-control" placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="first_name" onChange={this.handleChange("first_name")} value={first_name} className="form-control" placeholder="First Name"/>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="last_name" onChange={this.handleChange("last_name")} value={last_name} className="form-control" placeholder="Last Name"/>
        </div>
        <div className="form-group">
          <label>Country</label>
          <select name="country" className="form-control" value={country} onChange={this.handleChange("country")}>
            <option>Choose...</option>
            <option value="india" >India</option>
            <option value="us">US</option>
          </select>
        </div>
        <div className="form-group">
        <div className="form-check form-check-inline">
           <input className="form-check-input" type="radio" name="gender" value={gender} 
                                   checked={gender === "male"} 
                                   onChange={this.handleChange("gender")}/>
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" value={gender} 
                                   checked={gender === "female"} 
                                   onChange={this.handleChange("gender")}/>
            <label className="form-check-label">Female</label>
        </div>
      </div>
        
        <div className="form-group">
        <button type="submit" className="btn btn-primary">Register</button>  <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
        </div>
      
      <div className="message">
      { loading && <div>Please wait...</div> }
      { error && <div>{error}</div> }
     </div>
      </form>
    )
  }

  

  onSubmit(e) {
    e.preventDefault();
    let {username, password,email, first_name, last_name, gender,country} = this.state;
    this.props.register(username, password,email, first_name, last_name, gender,country);
    
  }
}
RegisterForm.propTypes = {
  user:PropTypes.shape({
    success:PropTypes.bool
  })
}


const mapStateToProps = (state) => {
  return {
    loading: state.registerData.loading,
    error: state.registerData.error,
    user: state.registerData.user
  };
}

const mapDispatchToProps = { register: postRegister};

let connecteRouter = withRouter(RegisterForm);

export default connect(mapStateToProps, mapDispatchToProps)(connecteRouter);