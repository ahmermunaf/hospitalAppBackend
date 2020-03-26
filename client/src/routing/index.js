import React, {Fragment} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import {
    Login,
    Reports,
    Patients,
    AddPatient,
    Users
} from '../pages';
import {BodyWithHeaderAndFooter, NotFount} from "../uiComponents";

function AdminRoutes() {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={BodyWithHeaderAndFooter(Patients)}/>
                <Route exact path="/reports" component={BodyWithHeaderAndFooter(Reports)}/>
                <Route exact path="/patients/add" component={BodyWithHeaderAndFooter(AddPatient)}/>
                <Route exact path="/users" component={BodyWithHeaderAndFooter(Users)}/>
                <Route path="*" component={NotFount}/>
            </Switch>
        </Fragment>
    )
}
function DoctorRoutes() {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={BodyWithHeaderAndFooter(Patients)}/>
                <Route exact path="/patients/add" component={BodyWithHeaderAndFooter(AddPatient)}/>
                <Route path="*" component={NotFount}/>
            </Switch>
        </Fragment>
    )
}
function HospitalRoutes() {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={BodyWithHeaderAndFooter(Reports)}/>
                <Route path="*" component={NotFount}/>
            </Switch>
        </Fragment>
    )
}
function AuthRouting() {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="*" component={NotFount}/>
            </Switch>
        </Fragment>
    )
}

export {
    AuthRouting,
    AdminRoutes,
    DoctorRoutes,
    HospitalRoutes
};
