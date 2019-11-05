import React, { Component } from "react";
import { Link } from 'react-router-dom';


class JobCard extends Component {

  render() {
    return (
      <div className="card container my-3">
        <div className="card-body">
          <h4>{this.props.job.title}</h4>
          <p>Salary: {this.props.job.salary}</p>
          <p>Equity: {this.props.job.equity}</p>
          {/* this.props.job.state === "applied" */}
          {this.props.applied.includes(this.props.job.id)
          ? <p className="btn btn-secondary float-right">Applied</p>
          : <Link 
            to="#" onClick={() => {this.props.handleApply(this.props.job.id)}} 
            className="btn btn-outline-primary float-right">Apply
            </Link>
          }
        </div>
    </div>
    );
  }
}

export default JobCard;