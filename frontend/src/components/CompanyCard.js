import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './CompanyCard.css';


class CompanyCard extends Component {
  render() {
    return (
      <div className="card container my-3">
        <Link to={`/companies/${this.props.company.handle}`}>
          <div className="row card-body">
            <div className="col-sm-10"><h4>{this.props.company.name}</h4></div>
            <div className="col-sm-2"><img src={this.props.company.logo_url} alt="logo" /></div>
            <div className="col-sm-12"><p>{this.props.company.description}</p></div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CompanyCard;