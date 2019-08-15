import React from 'react';
import axios from 'axios';

export default class FindRegoByJobNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          details: {}
        };
      }

      componentDidMount() {
        const header = {          
                'x-api-key': "ZT7muC1s485C5DtrgEloN8F0DVTm1M7JiRQQYUph",
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json'
        };

        const data = {
            "jobNumber": "385895"            
        }

        axios.post('https://6t7re99ysc.execute-api.ap-southeast-2.amazonaws.com/dev/V1/battery/job', data, header)
        .then((result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              details: result.data
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
        const { error, isLoaded, details } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul>
              {details.map((item, i) => {
                <li key={item.name} key={i}>
                  {item.name}
                </li>
              })}
            </ul>
          );
        }
      }
}