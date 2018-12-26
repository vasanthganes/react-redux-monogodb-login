import React,{ Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchLoggedOut } from "../../store/actions/login"


class Dahboard extends Component {
    logOut = () => {
        this.props.logout();
        this.props.history.push({
            pathname: "/",
            state: { message: "Logout Successfully..." }
          });
    }

    render(){
        console.log(this.props)
        return (<div> <h2>Dahboard</h2> <button onClick={this.logOut}>Logout</button></div>);
    }
}
  
const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginData.loggedIn
    };
  }
  
const mapDispatchToProps = {logout:fetchLoggedOut};
let connecteRouter = withRouter(Dahboard);

export default connect(mapStateToProps, mapDispatchToProps)(connecteRouter);