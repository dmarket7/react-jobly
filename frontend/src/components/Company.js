import React, { Component } from 'react';
import JoblyApi from '../JoblyApi';
import JobCard from './JobCard';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        jobs: []
      },
      applications: []
    }
    this.handleApply = this.handleApply.bind(this);
  }

  async componentDidMount() {
    try {
      let company = await JoblyApi.getCompany(this.props.match.params.id);
      let username = localStorage.getItem('joblyUser');
      let user = await JoblyApi.getUser(username);
      let jobsArray = user.jobs.map(uj => {
        return uj.id
      });
      this.setState({ company, applications: jobsArray });
    } catch {
      this.props.history.push('/login');
    }
  }

  async handleApply(id) {
    await JoblyApi.request(`jobs/${id}/apply`, {}, 'post');
    let username = localStorage.getItem('joblyUser');
    let user = await JoblyApi.getUser(username);
    let jobsArray = user.jobs.map(uj => {
      return uj.id
    });
    this.setState({ applications: jobsArray });
  }

  render() {
    return (
      <div className="my-4">
        <h4>{this.state.company.name}</h4>
        <p>{this.state.company.description}</p>
        {this.state.company.jobs.map(j => {
          return <JobCard 
                  job={j}
                  key={j.id}
                  applied={this.state.applications} 
                  handleApply={this.handleApply} 
                />
        })}
      </div>
    );
  }
}

export default Company;