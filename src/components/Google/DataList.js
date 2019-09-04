import React, { Component, Fragment } from 'react';
import config from './config';
import {load} from './sheet';

class DataList extends Component {

  state = {
    cars: [],
    error: null
  }

  onLoad = (data, error) => {
    if (data) {
      const cars = data.cars;
      this.setState({ cars });
    } else {
      this.setState({ error });
    }
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
      load(this.onLoad);
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
    const { cars, error } = this.state;
    if (error) {
      if(typeof error == 'object'){
        return <div>{error.message}</div>;
      }
      return <div>{error}</div>;
    }
    return (
      <Fragment>
        <ul>
          {cars.map((car, i) => (
            <li key={i}>
              {car.year} {car.make} {car.model}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
  
}

export default DataList;