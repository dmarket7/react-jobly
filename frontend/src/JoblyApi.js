import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem("joblyToken");

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async searchCompanies(query) {
    let res = await this.request(`companies?search=${query}`);
    return res.companies;
  }

  static async searchJobs(query) {
    let res = await this.request(`jobs?search=${query}`);
    return res.jobs;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
}

export default JoblyApi;