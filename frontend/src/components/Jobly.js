import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './Nav';
import LoginForm from './LoginForm';
import CompaniesList from './CompaniesList';
import Company from './Company';
import JobsList from './JobsList';
import ProfileForm from './ProfileForm';
import Home from './Home';

class Jobly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    let localToken = localStorage.getItem("joblyToken");
    if (localToken) this.setState({ loggedIn: true });
  }

  toggleLogin() {
    if (this.state.loggedIn) {
      this.setState({ loggedIn: !this.state.loggedIn });
      localStorage.removeItem("joblyToken")
    } else {
      this.setState({ loggedIn: !this.state.loggedIn });
    }

  }

  render() {
    let localToken = localStorage.getItem("joblyToken");

    return (
      <div>
        <BrowserRouter>
          <Nav token={localToken} toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn} />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Switch >
                  <Route exact path="/"
                    render={() => <Home loggedIn={this.state.loggedIn} />} />
                  <Route exact path="/companies"
                    render={routeProps => <CompaniesList {...routeProps} token={localToken} />} />
                  <Route exact path="/companies/:id"
                    render={routeProps => <Company {...routeProps} />} />
                  <Route exact path="/jobs"
                    render={routeProps => <JobsList {...routeProps} />} />
                  <Route exact path="/profile"
                    render={routeProps => <ProfileForm {...routeProps} />} />
                    {this.state.loggedIn 
                      ? <Redirect to="/" />
                      : <Route exact path="/login"
                        render={routeProps => <LoginForm {...routeProps} toggleLogin={this.toggleLogin} />} /> }
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Jobly;