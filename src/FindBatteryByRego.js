import React from 'react';
import axios from "axios";

export default class FindBatteryByRego extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const headers = {
          'crossorigin': true,
          'Access-Control-Allow-Origin': true,
          'x-api-key': "ZT7muC1s485C5DtrgEloN8F0DVTm1M7JiRQQYUph",
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
    };

    const data = {
        "rego": "ABC123"
    };

  axios.post('https://6t7re99ysc.execute-api.ap-southeast-2.amazonaws.com/dev/V1/battery/rego', data, headers)
    .then((result) => {
      this.setState({
        isLoaded: true,
        items: result.items
      });
    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {/* {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))} */}
        </ul>
      );
    }
  }
}
