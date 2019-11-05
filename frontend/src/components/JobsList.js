import React, { Component } from "react";
import JoblyApi from '../JoblyApi';
import JobCard from './JobCard';

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobsDisplayed: [],
      displayStart: 0,
      displayEnd: 10,
      search: "",
      applications: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    try {
      let jobs = await JoblyApi.getJobs();
      let jobsDisplayed = jobs.slice(this.state.displayStart, this.state.displayEnd);
      let username = localStorage.getItem('joblyUser');
      let user = await JoblyApi.getUser(username);
      let jobsArray = user.jobs.map(uj => {
        return uj.id
      });
      this.setState({ jobs, jobsDisplayed, applications: jobsArray });
      window.addEventListener('scroll', this.handleScroll);
      // this.handleScroll();
    } catch {
      this.props.history.push('/login');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
      if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight) {
          this.setState(st => (
            { displayEnd: st.displayEnd + 10}
          ));
          let jobsDisplayed = this.state.jobs.slice(this.state.displayStart, this.state.displayEnd);
          this.setState({ jobsDisplayed });
      }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let jobs = await JoblyApi.searchJobs(this.state.search);
    this.setState({ jobs });
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
      <div onScroll={this.handleScroll}>
        <form onSubmit={this.handleSubmit} className="form-inline my-2">
          <input
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.search}
            className="form-control col-sm-11"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
          />
          <button className="btn btn-outline-success my-2 col-sm-1" type="submit">Search</button>
        </form>
        {this.state.jobsDisplayed.map(j => {
          return <JobCard
            key={j.id}
            job={j}
            applied={this.state.applications}
            handleApply={this.handleApply}
          />
        })}
      </div>
    );
  }
}

export default JobsList;