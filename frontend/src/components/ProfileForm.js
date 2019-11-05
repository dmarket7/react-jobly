import React, { Component } from "react";
import JoblyApi from "../JoblyApi";
import './ProfileForm.css';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let getUsername = localStorage.getItem('joblyUser');
      let user = await JoblyApi.getUser(getUsername);
      let { username, first_name, last_name, email } = user;
      this.setState({
        username, first_name, last_name, email
      });
    } catch {
      this.props.history.push('/login');
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let { username, password, first_name, last_name, email } = this.state;
    await JoblyApi.request(`users/${username}`, { password, first_name, last_name, email }, 'patch');
    this.setState({
      submitted: true
    });
  }

  render() {

    return (
      <div>
        <h3>Profile</h3>
        {this.state.submitted
          ? <div className="alert alert-success">Profile Updated.</div>
          : null
        }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <p>{this.state.username}</p>
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First name</label>
            <input onChange={this.handleChange} name="first_name" value={this.state.first_name} type="text" className="form-control" id="first_name" placeholder="first_name" />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last name</label>
            <input onChange={this.handleChange} name="last_name" value={this.state.last_name} type="text" className="form-control" id="last_name" placeholder="last_name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={this.handleChange} name="email" value={this.state.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input onChange={this.handleChange} name="password" value={this.state.password} type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default ProfileForm;