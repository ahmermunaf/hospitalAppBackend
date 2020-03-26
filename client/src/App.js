import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthRouting, AdminRoutes, DoctorRoutes, HospitalRoutes} from "./routing";
import {getAll} from "./store/actions/Common";
import {connect} from "react-redux";
import Loading from "./uiComponents/loading/Loading";
import {checkAuth} from "./store/actions/Users";

class App extends Component {

    componentDidMount() {
        this.props.checkAuth()
    }


    renderRoutingWithRole = (role = '') => {
     switch (role) {
          case "admin" :
              return <AdminRoutes/>;
          case "doctor" :
              return <DoctorRoutes/>;
          case "hospital" :
              return <HospitalRoutes/>;
          default :
              return <AuthRouting/>
      }
    };

    render() {
        const {userLoggedIn, authLoading, user} = this.props;
        return (
            <div className="app-root">
                {authLoading ? <Loading/> : null}
                <BrowserRouter>
                    {this.renderRoutingWithRole(userLoggedIn ? user.type : '')}
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = ({users}) => {
    return {
        userLoggedIn: users.userLoggedIn,
        authLoading: users.checkAuthLoading,
        user: users.user
    }
};
const mapDispatchToProps = {
    checkAuth,
    getAll
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

