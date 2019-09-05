import React, { Component, Fragment } from 'react';
import config from './Sheet/config';
import {push} from './Sheet/visitors';

const data = [
  ['1', 'Achmad Mustakim', '085850062823', '1', 'Unduh Mantu', '', '']
];

class DataList extends Component {

  state = {
    visitors: [],
    error: null
  }

  onLoad = (data, error) => {
    if (data) {
      const visitors = data.visitors;
      this.setState({ visitors });
    } else {
      this.setState({ error });
    }
  };

  onPush = (data, error) => {
    console.log(data);
  };

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
      // 3. Initialize and make the API request.
      //load(this.onLoad);
      push(data, this.onPush);
    });
  };

  componentDidMount () {
    // const script = document.createElement("script");
    // script.src = "https://apis.google.com/js/api.js";
    // script.async = true;
    // script.defer = true;
    // document.body.appendChild(script);
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  render() {
    const { visitors, error } = this.state;
    if (error) {
      if(typeof error == 'object'){
        return <div>{error.message}</div>;
      }
      return <div>{error}</div>;
    }
    return (
      <Fragment>
        <ul>
          {visitors.map((visitor, i) => (
            <li key={i}>
              {visitor.no} {visitor.nama_lengkap} {visitor.kontak}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
  
}

export default DataList;